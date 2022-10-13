var blessed = require('blessed');

// Create a screen object.
var screen = blessed.screen();

// Create a box perfectly centered horizontally and vertically.
var box = blessed.box({
  top: 'center',
  left: 'center',
  width: '75%',
  height: '40%',
  content: '{center}{bold}cmdcord{/bold}\n{gray-fg}by andreweathan{/gray-fg}\n\nPress:\n{red-fg}1{/red-fg} - Login\n{red-fg}2{/red-fg} - Tutorial{/center}',
  tags: true,
  border: {
    type: 'line'
  },
  style: {
    fg: 'white',
    bg: 'black',
    border: {
      fg: '#ffffff'
    },
    hover: {
      bg: 'blue'
    }
  }

});

// Append our box to the screen.
screen.append(box);

// If our box is clicked, change the content.
box.on('click', function(data) {
  box.setContent('{center}{bold}cmdcord{/bold}\n{gray-fg}by andreweathan{/gray-fg}\nEnter token:{/center}');
  screen.render();
});

// If box is focused, handle `enter` and give us some more content.
box.key('enter', function() {
  box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
  box.setLine(1, 'bar');
  box.insertLine(1, 'foo');
  screen.render();
});

// Quit on Escape, q, or Control-C.
screen.key(['escape', 'q', 'C-c'], function(ch, key) {
  return process.exit(0);
});

// Focus our element.
box.focus();

// Render the screen.
screen.render();
