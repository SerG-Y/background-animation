import 'pixi.js';
import { Button } from 'src/Button';

const app = new PIXI.Application(800, 600, { backgroundColor: 0xffffff, autoResize: true });
const textureContainer: { [key: string]: PIXI.Texture } = {};
const spriteSheetMetadata = {
  metadata: {
    row: 2, column: 6, type: 'SpriteSheet',
  },
};
let animation: PIXI.extras.AnimatedSprite;
let playBtn: Button;

document.body.appendChild(app.view);

PIXI.loader
    .add('back_2_0', 'assets/images/back_2_0.jpg', spriteSheetMetadata)
    .add('back_2_1', 'assets/images/back_2_1.jpg', spriteSheetMetadata)
    .add('back_2_2', 'assets/images/back_2_2.jpg', spriteSheetMetadata)
    .add('back_2_3', 'assets/images/back_2_3.jpg', spriteSheetMetadata)
    .add('back_2_4', 'assets/images/back_2_4.jpg', spriteSheetMetadata)
    .add('back_2_5', 'assets/images/back_2_5.jpg', spriteSheetMetadata)
    .add('playBtn', 'assets/images/play.png')
    .add('pauseBtn', 'assets/images/pause.png')
    .add('resetBtn', 'assets/images/reset.png');

PIXI.loader.use(spriteSheetParser);

PIXI.loader.load(() => {
  animation = app.stage.addChild(new PIXI.extras.AnimatedSprite([
    ...Object.values(PIXI.loader.resources['back_2_0'].textures),
    ...Object.values(PIXI.loader.resources['back_2_1'].textures),
    ...Object.values(PIXI.loader.resources['back_2_2'].textures),
    ...Object.values(PIXI.loader.resources['back_2_3'].textures),
    ...Object.values(PIXI.loader.resources['back_2_4'].textures),
    ...Object.values(PIXI.loader.resources['back_2_5'].textures),
  ]));
  animation.anchor.set(0.5, 0);
  animation.position.set(400, 0);

  textureContainer.playBtn = PIXI.Texture.fromImage('playBtn');
  textureContainer.pauseBtn = PIXI.Texture.fromImage('pauseBtn');

  playBtn = app.stage.addChild(new Button(textureContainer.playBtn, onPlayBtnClicked.bind(this)));
  playBtn.scale.set(0.2);
  playBtn.position.set(450, 450);

  const resetBtn = app.stage.addChild(new Button(PIXI.Texture.fromImage('resetBtn'),
                                                 onResetBtnClicked.bind(this)));
  resetBtn.scale.set(0.2);
  resetBtn.position.set(350, 450);
});

function spriteSheetParser(resource, next) {
  if (resource && resource.metadata && resource.metadata.type === 'SpriteSheet') {
    const data = resource.metadata;
    const width = resource.texture.width / data.column;
    const height = resource.texture.height / data.row;

    resource.textures = {};

    for (let i = 0; i < data.row; i += 1) {
      for (let j = 0; j < data.column; j += 1) {
        const textureClone = resource.texture.clone();

        textureClone.frame = new PIXI.Rectangle(j * width, i * height, width, height);
        resource.textures[i * data.column + j] = textureClone;
      }
    }
  }

  next();
}

function onPlayBtnClicked(): void {
  if (animation.playing) {
    animation.stop();
    playBtn.texture = textureContainer.playBtn;
  } else {
    animation.play();
    playBtn.texture = textureContainer.pauseBtn;
  }
}

function onResetBtnClicked(): void {
  animation.gotoAndPlay(0);
}
