export class Button extends PIXI.Sprite {
  
  private readonly onClickCallback: Function;

  constructor(texture?: PIXI.Texture, onClickCallback?: Function) {
    super(texture);

    this.onClickCallback = onClickCallback;

    this.init();
  }

  protected init(): void {
    this.buttonMode = true;
    this.interactive = true;
    this.anchor.set(0.5);

    this
        .on('pointerup', this.onClick.bind(this));
  }

  protected onClick(): void {
    this.onClickCallback && this.onClickCallback();
  }
}
