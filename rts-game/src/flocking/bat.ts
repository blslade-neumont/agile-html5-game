import { GameObject, GameObjectOptions, fmod, degToRad, clamp } from '../engine';
import { BatController } from './bat-controller';
import { alives } from '../dbs/alive-db';
import { pointDistance, pointDistance2 } from '../utils/math';
import merge = require('lodash.merge');

export class Bat extends GameObject {
    constructor(private controller: BatController, opts: GameObjectOptions = {}) {
        super("Bat", merge(opts, {
            sprite: alives['bat'].sprite,
            animationAge: Math.random() * 1000
        }));
    }

    originGravitation = 1 / (1000 + Math.random() * 5000);
    originGravitationDistance = 1000 + Math.random() * 2000;
    renderDebugInfo = false;

    neighborDistance = 100 + Math.random() * 100;
    attentionSpan = 3 + Math.floor(Math.random() * 5);
    independence = .2 + Math.random() * 4;
    rotatingDirection = Math.random() * 360;

    angleVariation = 20 + Math.random() * 50;
    minSpeed = (.5 + Math.random() * 2) * 30;
    maxSpeed = this.minSpeed + (.5 + Math.random() * 2) * 30;

    repulsionDistance = 20 + Math.random() * 30;
    repulsionForce = 30 * (5 + Math.random() * 20);
    alignmentDistance = 1 + Math.random() * 3;
    alignmentForce = (2 + Math.random() * 5) * .2;
    cohesionForce = (2 + Math.random() * 5) * .2;
    
    private env: Bat[] = [];
    private timeSinceLastEnv = Infinity;
    private envCalcThreshold = .25 + Math.random() * .5;
    
    tick(delta: number) {
        super.tick(delta);
        if (this.x > this.originGravitationDistance || this.x < -this.originGravitationDistance) {
            this.hspeed -= this.x * this.originGravitation;
        }
        if (this.y > this.originGravitationDistance || this.y < -this.originGravitationDistance) {
            this.vspeed -= this.y * this.originGravitation;
        }

        this.rotatingDirection += 90 * (Math.random() - .5);
        this.rotatingDirection = fmod(this.rotatingDirection, 360);
        let rotAdd = this.angleVariation * Math.cos(degToRad(this.rotatingDirection));
        this.direction += rotAdd * delta;

        if (this.timeSinceLastEnv > this.envCalcThreshold) {
            let nbdist2 = this.neighborDistance * this.neighborDistance;
            this.env = this.controller.bats
                .map(bird => ({ bird: bird, dist: pointDistance2(this.x, this.y, bird.x, bird.y) }))
                .filter(bird => bird.bird != this && bird.dist < nbdist2)
                .sort((lhs, rhs) => lhs.dist - rhs.dist)
                .slice(0, this.attentionSpan)
                .map(bird => bird.bird);
            this.timeSinceLastEnv = 0;
        }
        this.timeSinceLastEnv += delta;
        let env = this.env;

        let gravHVSpeed = env.reduce((prev: [number, number], current) => {
            let dist = pointDistance(this.x, this.y, current.x, current.y);
            let addx = 0, addy = 0;
            if (dist < this.repulsionDistance) {
                //Repulsion
                addx += (this.x - current.x) * this.repulsionForce * (this.repulsionDistance - dist) / this.repulsionDistance;
                addy += (this.y - current.y) * this.repulsionForce * (this.repulsionDistance - dist) / this.repulsionDistance;
            }
            else {
                //Alignment
                addx += ((current.x - this.x) + current.hspeed * this.alignmentDistance) * this.alignmentForce;
                addy += ((current.y - this.y) + current.vspeed * this.alignmentDistance) * this.alignmentForce;

                //Cohesion
                addx += (current.x - this.x) * this.cohesionForce;
                addy += (current.y - this.y) * this.cohesionForce;
            }
            return [prev[0] + addx, prev[1] + addy];
        }, [0, 0]);
        if (env.length > 0) {
            gravHVSpeed = [gravHVSpeed[0] / env.length, gravHVSpeed[1] / env.length];
            this.hspeed = (this.hspeed * this.independence + gravHVSpeed[0] * delta) / (delta + this.independence);
            this.vspeed = (this.vspeed * this.independence + gravHVSpeed[1] * delta) / (delta + this.independence);
        }

        this.speed = clamp(this.speed, this.minSpeed, this.maxSpeed);
        this.animationSpeed = .5 + (1 * (this.maxSpeed - this.minSpeed) / (this.maxSpeed - this.minSpeed));

        this.imageAngle = this.direction + 90;
    }

    render(context: CanvasRenderingContext2D) {
        super.render(context);
        if (!this.renderDebugInfo) return;

        context.strokeStyle = 'rgba(0, 0, 0, .2)';
        context.beginPath();
        context.ellipse(this.x, this.y, this.neighborDistance, this.neighborDistance, 0, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();

        context.beginPath();
        for (let bird of this.env) {
            context.moveTo(this.x, this.y);
            context.lineTo(bird.x, bird.y);
        }
        context.closePath();
        context.stroke();

        context.strokeStyle = 'rgba(255, 0, 0, .4)';
        context.beginPath();
        context.ellipse(this.x, this.y, this.repulsionDistance, this.repulsionDistance, 0, 0, 2 * Math.PI);
        context.closePath();
        context.stroke();
    }
}
