export let config = {
    background: {
        topOffset: 120
    },
    labels: {
        roundId: {
            text: 'This is round #',
            style: {
                font: 'bold 20px Arial',
                fill: '#00ff00',
                stroke: '#cccccc'
            },
            position: new PIXI.Point(0, 0)
        },
        currentUser:{
            text: 'Current move belongs to: ',
            style: {
                font: 'bold 30px Arial',
                fill: '#ff0000',
                stroke: '#cccccc'
            },
            fillColors: ['#0000ff', '#ff0000'],
            position: new PIXI.Point(0, 50)
        },
        win: {
            text: 'CONGRATULATIONS! User wins!',
            style: {
                font: 'bold 35px Arial',
                fill: '#ff0000',
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
        time: .4
    }
};