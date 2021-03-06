const HERO_ALL_FRAMES = 31,
    FALL_INDEX = 0,
    FALL_FRAMES = 1,
    JUMP_INDEX = 1,
    JUMP_FRAMES = 1,
    RUN_INDEX = 2,
    RUN_FRAMES = 14,
    WALK_INDEX = 16,
    WALK_FRAMES = 15,
    STAY_INDEX = 19,
    CYCLES_PER_FRAME_RUN = 3,
    CYCLES_PER_FRAME_WALK = 6,
    DEFAULT_IMPULSE_X = 7,
    DEFAULT_IMPULSE_Y = 10;

var heroSheet = document.getElementById("hero-sprite");

class Player {
    constructor(playerCtx, coords, speed, impulse) {
        this.playerCtx = playerCtx;
        this.coords = coords || { x: 150, y: FIELD_HEIGHT - 150 };
        this.speed = speed || { x: 0, y: 0 };
        this.rigidBody = this.createRigidBody(impulse);
        this.sprite = this.createSprite();
    }

    createRigidBody(impulse) {
        impulse = impulse || { x: DEFAULT_IMPULSE_X, y: DEFAULT_IMPULSE_Y };
        return new RigidBody(
            this.coords,
            this.speed,
            heroSheet.width / HERO_ALL_FRAMES,
            heroSheet.height,
            impulse);
    }

    createSprite() {
        return new Sprite(
            heroSheet,
            heroSheet.width / HERO_ALL_FRAMES,
            heroSheet.height,
            this.playerCtx,
            WALK_INDEX, // start frame in sheet
            WALK_FRAMES, // number of frames
            CYCLES_PER_FRAME_WALK);
    }

    changeSprite(name) {
        switch (name) {
            case "walk":
                this.sprite.frameIndex = WALK_INDEX;
                this.sprite.framesCount = WALK_FRAMES;
                this.sprite.cyclesPerFrame = CYCLES_PER_FRAME_WALK;
                break;
            case "run":
                this.sprite.frameIndex = RUN_INDEX;
                this.sprite.framesCount = RUN_FRAMES;
                this.sprite.cyclesPerFrame = CYCLES_PER_FRAME_RUN;
                break;
            case "jump":
                this.sprite.frameIndex = JUMP_INDEX;
                this.sprite.framesCount = JUMP_FRAMES;
                break;
            case "fall":
                this.sprite.frameIndex = FALL_INDEX;
                this.sprite.framesCount = FALL_FRAMES;
                break;
            case "stay":
                this.sprite.frameIndex = STAY_INDEX;
                this.sprite.framesCount = 1;
                break;
        }
        return this.sprite;
    }

    switchHeroSprites() {
        var heroBody = this.rigidBody,
            heroSprite = this.Sprite;
        if ((heroBody.speed.x > 0 && heroBody.speed.y === 0) || globalSpeedX > 5) {
            heroSprite = this.changeSprite("run");
        } else if ((heroBody.speed.x < 0.5 && heroBody.speed.y === 0) || globalSpeedX < 5) {
            heroSprite = this.changeSprite("walk");
        }
        if (heroBody.speed.y !== 0) {
            heroSprite = this.changeSprite("jump");
        }
        if (globalSpeedX === 0) {
            heroSprite = this.changeSprite("stay");
        }
        return this;
    }
}