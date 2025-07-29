// BubbleApp.jsx
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Stage } from '@pixi/react';
import * as PIXI from 'pixi.js';
import bubble from './assets/images/deco/bg_bubble.webp'

// 向量類
class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    addTo(vector) {
        this.x += vector.x;
        this.y += vector.y;
    }

    mult(value) {
        return new Vector(this.x * value, this.y * value);
    }
}

// 泡泡類
class Bubble {
    constructor({ x, y, init = false }) {
        this.sprite = PIXI.Sprite.from(bubble);
        this.position = new Vector(x, y);
        this.velocity = new Vector(Math.random() * 0.1 - 0.05, init ? -0.1 : -0.01);
        this.acceleration = new Vector(Math.random() * 0.01 - 0.005, init ? -0.1 : -0.01);
        this.pressure = new Vector(Math.random() * 0.1 - 0.05, -0.1);
        this.waterResistance = new Vector(Math.random() * 0.1 - 0.05, -0.1);
        this.scale = Math.random() * 0.5;
        this.mass = Math.random() * 0.1;
        this.sprite.rotation = Math.random() * Math.PI;
        this.sprite.anchor.set(0.5);
        this.sprite.scale.set(this.scale);
        this.isDead = false;
        this.init = init
    }

    applyForce(force) {
        const f = force.mult(this.mass);
        this.acceleration.addTo(f);
    }

    update() {
        this.applyForce(this.pressure);
        this.applyForce(this.waterResistance);
        this.velocity.addTo(this.acceleration);
        this.position.addTo(this.velocity);
        // 重置加速度
        this.acceleration = new Vector(0, 0);
        // 縮小泡泡
        this.scale -= this.init ? 0.003 : 0.005;
        if (this.scale < 0) this.isDead = true;
        this.sprite.scale.set(this.scale);
        this.sprite.x = this.position.x;
        this.sprite.y = this.position.y;
    }
}

const BubbleWrap = ({ loading }) => {
    const [bubbles, setBubbles] = useState([]);
    const containerRef = useRef(null);
    const displacementSpriteRef = useRef(null);
    const displacementFilterRef = useRef(null);
    const appRef = useRef(null);
    const animationRef = useRef(null);

    // 初始化泡泡
    useEffect(() => {
        if (loading) return;

        const initialBubbles = [];
        for (let i = 0; i < 100; i++) {
            const bubble = new Bubble({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                init: true
            });
            initialBubbles.push(bubble);
            containerRef.current.addChild(bubble.sprite);
        }
        setBubbles(initialBubbles);
    }, [loading]);

    // 位移過濾器設置
    const displacementFilter = useMemo(() => {
        const sprite = PIXI.Sprite.from(bubble);
        sprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;
        const filter = new PIXI.filters.DisplacementFilter(sprite);
        filter.padding = 0;
        sprite.position.set(0, 0);
        displacementSpriteRef.current = sprite;
        displacementFilterRef.current = filter;
        return filter;
    }, []);

    // 動畫循環
    useEffect(() => {
        const animate = () => {
            // 更新每個泡泡
            setBubbles((prevBubbles) => {
                const updatedBubbles = prevBubbles.filter((bubble) => {
                    if (bubble.isDead) {
                        containerRef.current.removeChild(bubble.sprite);
                        return false;
                    } else {
                        bubble.update();
                        return true;
                    }
                });
                return updatedBubbles;
            });

            // 移動位移圖
            if (displacementSpriteRef.current) {
                displacementSpriteRef.current.x += 1;
                if (displacementSpriteRef.current.x > displacementSpriteRef.current.width) {
                    displacementSpriteRef.current.x = 0;
                }
            }

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animationRef.current);
        };
    }, [displacementFilter]);

    // 處理鼠標事件
    useEffect(() => {
        let lastBubbleTime = 0; // 用來記錄上次生成泡泡的時間
    
        const handleMouseMove = (e) => {
            const currentTime = new Date().getTime();
            if (currentTime - lastBubbleTime >= 80) {
                const newBubble = new Bubble({
                    x: e.clientX,
                    y: e.clientY,
                });
                setBubbles((prev) => [...prev, newBubble]);
                containerRef.current.addChild(newBubble.sprite);
    
                lastBubbleTime = currentTime;
            }
        };
    
        window.addEventListener('mousemove', handleMouseMove);
    
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, zIndex: 2 }} className='bubbles-block'>
            <Stage
                width={window.innerWidth}
                height={window.innerHeight}
                options={{
                    backgroundAlpha: 0,
                    antialias: true,
                    resizeTo: window,
                }}
                onMount={(app) => {
                    appRef.current = app;
                    const container = new PIXI.Container();
                    app.stage.addChild(container);
                    container.filters = [displacementFilter];
                    containerRef.current = container;

                    bubbles.forEach((bubble) => {
                        container.addChild(bubble.sprite);
                    });

                    if (displacementSpriteRef.current) {
                        app.stage.addChild(displacementSpriteRef.current);
                    }
                }}
            >
            </Stage>
        </div>
    );
};

export default BubbleWrap;
