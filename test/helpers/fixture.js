function setUpHTMLFixture() {
  setFixtures('<div id="grid">' 
    + '<div id="0" class="cell active" align="center" onclick="controller.clicked(0)"><i class="fa fa-square-o fa-5x"></i></div>'
    + '<div id="1" class="cell active" align="center" onclick="controller.clicked(1)"><i class="fa fa-square-o fa-5x"></i></div>'
    + '<div id="2" class="cell active" align="center" onclick="controller.clicked(2)"><i class="fa fa-square-o fa-5x"></i></div>'
    + '<div id="3" class="cell active" align="center" onclick="controller.clicked(3)"><i class="fa fa-square-o fa-5x"></i></div>'
    + '<div id="4" class="cell active" align="center" onclick="controller.clicked(4)"><i class="fa fa-square-o fa-5x"></i></div>'
    + '<div id="5" class="cell active" align="center" onclick="controller.clicked(5)"><i class="fa fa-square-o fa-5x"></i></div>'
    + '<div id="6" class="cell active" align="center" onclick="controller.clicked(6)"><i class="fa fa-square-o fa-5x"></i></div>'
    + '<div id="7" class="cell active" align="center" onclick="controller.clicked(7)"><i class="fa fa-square-o fa-5x"></i></div>'
    + '<div id="8" class="cell active" align="center" onclick="controller.clicked(8)"><i class="fa fa-square-o fa-5x"></i></div>'
  + '</div>'
    )

}
var controller = new Controller();