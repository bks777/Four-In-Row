export let config = {
    background: {
        topOffset: 120
    },
    labels: {
        roundId: {
            text: 'This is move#',
            style: {
                font: 'bold 20px Arial',
                fill: '#00ff00',
                stroke: '#cccccc'
            },
            position: new PIXI.Point(0, 0)
        },
        currentUser:{
            text: 'Now is a move of: ',
            style: {
                font: 'bold 40px Arial',
                fill: '#ff0000',
                stroke: '#cccccc'
            },
            fillColors: ['#0000ff', '#ff0000'],
            position: new PIXI.Point(0, 50)
        },
        win: {
            text: 'WIN of ',
            style: {
                font: 'bold 35px Arial',
                fill: '#ffffff',
                stroke: '#cccccc'
            },
            position: new PIXI.Point(100, 50)
        },
        newRound:{
            text: 'New Round Begins!',
            style: {
                font: 'bold 20px Arial',
                fill: '#00ff00',
                stroke: '#cccccc'
            },
            position: new PIXI.Point(0, 0)
        }
    },
    map: {
        columnWidth: Math.ceil(640 / 7),
        cellHeight: Math.ceil(480 / 6),
        colors: [0xff0000, 0x0000ff]
    },
    circle: {
        radius: 40
    },
    animation: {
        time: .4,
        autoStartTime: 2000
    }
};