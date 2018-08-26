$(document).ready(function() {
  var app = {
    cards: [1,1,2,2,3,3,4,4,5,5,6,6],
    turned_over: 0,
    color_classes: ['clr-1', 'clr-1', 'clr-2', 'clr-2', 'clr-3', 'clr-3', 'clr-4', 'clr-4', 'clr-5', 'clr-5', 'clr-6', 'clr-6'],
    init: function() {
      app.colorCards()
      app.shuffle()
    },
    shuffle: function() {
      var random = 0
      var temp = 0
      for(var i = 0; i < app.cards.length; i++) {
        random = Math.floor((Math.random() * 12))
        temp = app.cards[i]
        app.cards[i] = app.cards[random]
        app.cards[random] = temp
        
      }
      app.assignCards()
      console.log('Shuffled Card Array: ' + app.cards)

        
    },
    assignCards: function() {
      $('.card').each(function(index) {
        $(this).attr('data-card-value', app.cards[index])
      })
      app.clickHandlers()
    },
    clickHandlers: function() {
      
      $('.card').on('click', function() {
        if (app.turned_over === 0 || app.turned_over === 1) {
          $(this).html('<div><p>' + $(this).data('cardValue') + '</p></div>' ).addClass('selected')
          app.turned_over += 1
          app.checkMatch()
        }
      })
    },
    checkMatch: function() {
      if ($('.selected').length == 2) {
        if ($('.selected').first().data('cardValue') === $('.selected').last().data('cardValue')) {
          // cards matched
          // remove cards

          $('.selected').each(function() {
            $(this).animate({opacity: 0})
          })

          setTimeout(function () {
            $('.selected').each(function() {
              $(this).removeClass('unmatched').removeClass('selected').addClass('no-hover')
              app.turned_over = 0
              app.checkWin()
            })
          }, 1000)

          // $('.selected').each(function() {
          //   $(this).animate({opacity: 0}).removeClass('unmatched')
          // })


          // $('.selected').each(function() {
          //   $(this).removeClass('selected')
          // })
          // app.turned_over = 0
          // app.checkWin()
          
        } else {
          // cards didn't match
          // flip cards back over
          setTimeout(function() {
            app.turned_over = 0
            $('.selected').each(function() {
              $(this).html(' ').removeClass('selected')
              })
            }, 1000)

        }
      }
    },
    checkWin: function() {
      if ( $('.unmatched').length === 0 ) {
        $('.container').html('<h1>You Won!</h1>')
      }
    },
    colorCards: function() {
      $('.card').each(function() {
        var rand_color_index = Math.floor(Math.random() * app.color_classes.length)
        $(this).addClass(app.color_classes[rand_color_index])
        app.color_classes.splice(rand_color_index, 1)
      })
    }
  }
  app.init()
})