$(document).ready(function() {
	(function(){
		
		var Memory = {

			init: function(cards){
				this.$game = $(".game");
				this.$modal = $(".modal");
				this.$overlay = $(".modal-overlay");
				this.$restartButton = $(".restart");
				this.cardsArray = $.merge(cards, cards);
				this.shuffleCards(this.cardsArray);
				this.setup();
			},

			shuffleCards: function(cardsArray){
				this.$cards = $(this.shuffle(this.cardsArray));
			},

			setup: function(){
				this.html = this.buildHTML();
				this.$game.html(this.html);
				this.$memoryCards = $(".card");
				this.binding();
				this.paused = false;
	     	this.guess = null;
			},

			binding: function(){
				this.$memoryCards.on("click", this.cardClicked);
				this.$restartButton.on("click", $.proxy(this.reset, this));
			},

			cardClicked: function(){
				var _ = Memory;
				var $card = $(this);
				if(!_.paused && !$card.find(".inside").hasClass("matched") && !$card.find(".inside").hasClass("picked")){
					$card.find(".inside").addClass("picked");
					if(!_.guess){
						_.guess = $(this).attr("data-id");
					} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
						$(".picked").addClass("matched");
						_.guess = null;
					} else {
						_.guess = null;
						_.paused = true;
						setTimeout(function(){
							$(".picked").removeClass("picked");
							Memory.paused = false;
						}, 600);
					}
					if($(".matched").length == $(".card").length){
						_.win();
					}
				}
			},

			win: function(){
				this.paused = true;
				setTimeout(function(){
					Memory.showModal();
					Memory.$game.fadeOut();
				}, 1000);
			},

			showModal: function(){
				this.$overlay.show();
				this.$modal.fadeIn("slow");
			},

			hideModal: function(){
				this.$overlay.hide();
				this.$modal.hide();
			},

			reset: function(){
				this.hideModal();
				this.shuffleCards(this.cardsArray);
				this.setup();
				this.$game.show("slow");
			},

			shuffle: function(array){
				var counter = array.length, temp, index;
		   	while (counter > 0) {
	        	index = Math.floor(Math.random() * counter);
	        	counter--;
	        	temp = array[counter];
	        	array[counter] = array[index];
	        	array[index] = temp;
		    	}
		    	return array;
			},

			buildHTML: function(){
				var frag = '';
				this.$cards.each(function(k, v){
					frag += '<div class="card" data-id="'+ v.id +'"><div class="inside">\
					<div class="front"><img src="'+ v.img +'"\
					alt="'+ v.name +'" /></div>\
					<div class="back"><img src="/assets/basecamp-logo.png"\
					alt="Codepen" /></div></div>\
					</div>';
				});
				return frag;
			}
		};

		var cards = [
			{
				name: "dhh",
				img: "/assets/dhh.jpeg",
				id: 1,
			},
			{
				name: "jason",
				img: "/assets/jason.jpg",
				id: 2
			},
			{
				name: "remote",
				img: "/assets/remote.png",
				id: 3
			},
			{
				name: "rails",
				img: "/assets/ruby-on-rails.png",
				id: 4
			}, 
			{
				name: "employees",
				img: "/assets/employees.png",
				id: 5
			},
			{
				name: "damien",
				img: "/assets/damien.jpg",
				id: 6
			}
		];
	    
		Memory.init(cards);


	})();
});