$(document).ready(function() {
  var app = {
    cards: [1,1,2,2,3,3,4,4,5,5,6,6],
    turned_over: 0,
    color_classes: ['clr-1', 'clr-1', 'clr-2', 'clr-2', 'clr-3', 'clr-3', 'clr-4', 'clr-4', 'clr-5', 'clr-5', 'clr-6', 'clr-6'],
    init: function() {
      app.colorCards()
      // $('.main-container').animate({opacity: 1}, 2000)
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
        console.log(app.turned_over)
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
              $(this).html('').removeClass('unmatched').removeClass('selected').addClass('no-hover')
            })
            app.turned_over = 0
          }, 1000)
          app.checkWin()
          
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
        $('.container').eq(1).html('<p>You Win</p>').addClass('won-class')
      }
    },
    colorCards: function() {
      $('.card').each(function(index, element) {

        var rand_color_index = Math.floor(Math.random() * app.color_classes.length)

        $(this).addClass(app.color_classes[rand_color_index])

        $(element).animate({opacity: 1}, (Math.pow(Math.random(), 2) * 3000))
        app.color_classes.splice(rand_color_index, 1)
      })
    }
  }
  app.init()
})