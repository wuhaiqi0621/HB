// 定义游戏对象
class Game {
    constructor() {
        this.player = {
            x: 30,
            y: 430,
            width: 50,
            height: 50,
            isJumping: false
        };
        this.blocks = [
            { x: 60, y: 300, width: 30, height: 40 }
        ];
        this.gravity = 2;
        this.gameOver = false;
        this.score = 0;
    }

    jump() {
        if (this.player.isJumping) return;
        
        // 假设的跳跃高度和持续时间
        let jumpHeight = 100;
        let jumpDuration = 1000; // ms
        const initialY = this.player.y;

        this.player.isJumping = true;
        const startTime = Date.now();

        const jumpInterval = setInterval(() => {
            let currentTime = Date.now();
            let timePassed = currentTime - startTime;
            let progress = timePassed / jumpDuration;

            if (timePassed < jumpDuration / 2) {
                this.player.y = initialY - (jumpHeight * progress * 2);
            } else {
                this.player.y = initialY - jumpHeight + (jumpHeight * (progress - 0.5) * 2);
            }

            if (progress >= 1) {
                clearInterval(jumpInterval);
                this.player.isJumping = false;
                this.player.y = initialY;
            }
        }, 20);
    }

    moveBlocks() {
        this.blocks.forEach(block => {
            block.x -= 5; // 每次调用向左移动5像素
            if (block.x + block.width < 0) {
                block.x = 500; // 重新回到右边
                this.increaseScore();
            }
        });
    }

    increaseScore() {
        this.score += 10;
    }

    checkGameOver() {
        // 碰撞检测简化示例
        this.blocks.forEach(block => {
            if (
                this.player.x < block.x + block.width &&
                this.player.x + this.player.width > block.x &&
                this.player.y < block.y + block.height &&
                this.player.height + this.player.y > block.y
            ) {
                this.gameOver = true;
            }
        });
    }

    runGame() {
        if (this.gameOver) {
            console.log("Game Over");
            return;
        }

        this.moveBlocks();
        this.checkGameOver();
        setTimeout(() => this.runGame(), 50); // 更新游戏状态
    }

    start() {
        this.gameOver = false;
        this.runGame(); // 开始游戏循环
    }

    reset() {
        this.blocks = [{ x: 60, y: 300, width: 30, height: 40 }];
        this.player.x = 30;
        this.player.y = 430;
        this.score = 0;
        this.start();
    }
}

// 创建并运行游戏
const myGame = new Game();
myGame.start();

// 在合适的时机调用
myGame.jump(); // 模拟跳跃行为
