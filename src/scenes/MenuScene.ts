import { Scene, GameObjects, Types } from 'phaser';
import gameOptions from "../helper/gameOptions.ts";

export default class MenuScene extends Scene
{
    private title: GameObjects.Text;
    private titleText: string;
    private menuEntries: string[];
    private instructionText: string;
    private titleStyle: Types.GameObjects.Text.TextStyle;
    private inactiveStyle: Types.GameObjects.Text.TextStyle;
    private activeStyle: Types.GameObjects.Text.TextStyle;
    private instructionStyle: Types.GameObjects.Text.TextStyle;
    private selected: number;
    private items: GameObjects.Text[];

    constructor()
    {
        super('Menu');
    }

    create()
    {

        // -----------------------
        // Define parameters
        // -----------------------

        // title text
        this.titleText = gameOptions.gameTitle;

        // menu entries
        this.menuEntries = [
            'Start',
            'How to Play',
            'Credits'
        ];

        // instruction text
        this.instructionText = 'Use arrow keys or W, A, S, D to select\nUse [SPACE] or [ENTER] to confirm';

        // styles of the title menu entries (active or inactive) and instruction text
        this.titleStyle = {
            fontFamily: 'Arial',
            fontSize: '70px',
            color: '#FFFF00',
            fontStyle: 'bold'
        }

        this.inactiveStyle = {
            fontFamily: 'Arial',
            fontSize: '40px',
            color: '#ffff00',
            fontStyle: '',
        }

        this.activeStyle = {
            fontFamily: 'Arial',
            fontSize: '50px',
            color: '#0000ff',
            fontStyle: 'bold',
        }

        this.instructionStyle = {
            font: '20px Arial',
            color: '#27ff00'
        }

        // -----------------------
        // Setup scene
        // -----------------------

        // initialize empty parameters
        this.selected = 0;
        this.items = [];

        // Title
        this.title = this.add.text(gameOptions.gameWidth / 2, gameOptions.gameHeight * 0.2, this.titleText, this.titleStyle).setOrigin(0.5, 0.5);

        // Instruction / press key text
        this.add.text(gameOptions.gameWidth / 2, gameOptions.gameHeight - 46, this.instructionText, this.instructionStyle).setOrigin(0.5);

        // Create the menu with its entries
        this.createMenu(this.menuEntries);

        // Add keyboard inputs
        this.addKeys();

    }

    // Creates the menu with its entries, sets the styles for it and adds the mouse events
    createMenu(menuEntries: string[]): void {

        // start position and y space between the entries
        const start = {x: gameOptions.gameWidth / 2, y: this.title.y + gameOptions.gameHeight * 0.2};      // start position
        const ySpace = gameOptions.gameHeight * 0.1;                                         // ySpace between the entries

        // create menu items (loop through each item)
        for (let i = 0;i < menuEntries.length; i++) {

            const item = this.add.text(start.x, start.y + i * ySpace, menuEntries[i]).setOrigin(0.5);

            item.setInteractive();          // set interactive

            item.on(Phaser.Input.Events.POINTER_OVER, function(this: MenuScene) : void {        // set event action for mouse over (selecting it)
                this.selectSpecific(i);
            }, this);

            item.on(Phaser.Input.Events.POINTER_DOWN, function(this: MenuScene) : void {        // set event action for pointer down (clicking it with the mouse)
                this.selectSpecific(i);          // select the entry (if not already)
                this.spaceEnterKey();           // click it
            }, this);

            this.items.push(item);
        }

        this.highlightSelected();         // highlight the selected entry
    }

    // Select the next menu entry (when clicking down)
    selectNext(): void {

        // select the next, or if it is the last entry select the first again
        if (this.selected >= this.items.length - 1) {
            this.selected = 0;              // select the first entry
        }
        else {
            this.selected++;                // select the previous entry
        }

        // highlight the selected entry
        this.highlightSelected();

    }

    // Select the previous menu entry (when clicking up)
    selectPrevious(): void {

        // select the previous, or if it is the first entry select the last again
        if (this.selected <= 0) {
            this.selected = this.items.length -1;   // select the last entry
        }
        else {
            this.selected--;                        // select the previous entry
        }

        // highlight the selected entry
        this.highlightSelected();

    }

    // Select specific menu entry (when moving with the mouse over it)
    selectSpecific(itemIndex: number): void {

        this.selected = itemIndex;

        // highlight the selected entry
        this.highlightSelected();

    }

    // Highlights the selected entry (changing the styles of the deselected and selected entries)
    highlightSelected(): void {

        for (let i in this.items) {
            this.items[i].setStyle(this.inactiveStyle);         // change the style of all entries to the inactive style
        }

        this.items[this.selected].setStyle(this.activeStyle);   // change the style of the selected entry to the active style

    }

    // Add keyboard input to the scene.
    addKeys(): void {

        // up and down keys (moving the selection of the entries)
        this.input.keyboard!.addKey('Down').on('down', function(this: MenuScene) { this.selectNext() }, this);
        this.input.keyboard!.addKey('S').on('down', function(this: MenuScene) { this.selectNext() }, this);
        this.input.keyboard!.addKey('Up').on('down', function(this: MenuScene) { this.selectPrevious() }, this);
        this.input.keyboard!.addKey('W').on('down', function(this: MenuScene) { this.selectPrevious() }, this);

        // enter and space key (confirming a selection)
        this.input.keyboard!.addKey('Enter').on('down', function(this: MenuScene) { this.spaceEnterKey() }, this);
        this.input.keyboard!.addKey('Space').on('down', function(this: MenuScene) { this.spaceEnterKey() }, this);

    }

    // Action which happens when the enter or space key is pressed.
    spaceEnterKey() {

        switch(this.selected) {
            case 0:                 // start the game when the first entry is selected ("Start")
                this.scene.start('Game');
                break;
            case 1:                 // start the "Howto" scene when the "How To Play" entry is selected
                console.log("HowTo");
                break;
            case 2:                 // start the "Credits" scene when the "How To Play" entry is selected
                console.log("Credits");
                break;
            default:
                this.scene.start('Game');   // start the game by default
                break;
        }

    }
}
