var room
var ran
        if (this.type !== undefined) {
              let loc = { x: this.x, y: this.y, };
              if (room.isIn('port', loc)) {
                var gridpos = {
                    x: Math.floor(loc.x * room.xgrid / room.width),
                    y: Math.floor(loc.y * room.ygrid / room.height),
                }
                var z = 0
                for (var i = 0; i < room['port'].length; i++) {
                    var amdgridport = {
                        y: (room['port'][i].y * room.ygrid / room.height) - 0.5,
                        x: (room['port'][i].x * room.xgrid / room.width) - 0.5,
                    }
                    if ((amdgridport.x === gridpos.x) && (amdgridport.y === gridpos.y)) {
                        z = i
                    }
                }
                let cent = room['port'][z]
                let x = (z >= room['port'].length - 1) ? 0 : z
                let divForce = this.type == 'tank' ? 110 : 100
                this.velocity.x -= (loc.x - cent.x) / divForce
                this.velocity.y -= (loc.y - cent.y) / divForce
                if ((loc.x < room['port'][z].x + (10 / room.ygrid * (room.height / 100))) && (loc.x > room['port'][z].x - (10 / room.ygrid * (room.height / 100))) && (loc.y < room['port'][z].y + (10 / room.ygrid * (room.height / 100))) && loc.y > room['port'][z].y - (10 / room.ygrid * (room.height / 100))) {
                    this.x = room['port'][x].x
                    this.y = room['port'][x].y
                    this.velocity.x += (ran.randomRange(0, 1) < 0.5) ? ran.randomRange(20, 30) : ran.randomRange(-30, -20)
                    this.velocity.y += (ran.randomRange(0, 1) < 0.5) ? ran.randomRange(20, 30) : ran.randomRange(-30, -20)
                }
              }
            }