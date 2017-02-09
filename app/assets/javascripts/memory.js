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
					$card.find(".back img").hide();
					if(!_.guess){
						_.guess = $(this).attr("data-id");
					} else if(_.guess == $(this).attr("data-id") && !$(this).hasClass("picked")){
						$(".picked").addClass("matched");
						_.guess = null;
					} else {
						_.guess = null;
						_.paused = true;
						setTimeout(function(){
							$(".picked").find(".back img").show();
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
					<div class="back"><img src="http://res.cloudinary.com/ind-pendant/image/upload/v1486511382/basecamp-logo_volumg.png"\
					alt="Codepen" /></div></div>\
					</div>';
				});
				return frag;
			}
		};

		var cards = [
			{
				name: "dhh",
				img: "http://res.cloudinary.com/ind-pendant/image/upload/v1486511329/dhh_s9v1dy.jpg",
				id: 1,
			},
			{
				name: "jason",
				img: "http://res.cloudinary.com/ind-pendant/image/upload/v1486511329/jason_mx810k.jpg",
				id: 2
			},
			{
				name: "remote",
				img: "http://res.cloudinary.com/ind-pendant/image/upload/v1486511329/remote_josiil.png",
				id: 3
			},
			{
				name: "rails",
				img: "http://res.cloudinary.com/ind-pendant/image/upload/v1486511329/ruby-on-rails_mbbhsn.png",
				id: 4
			}, 
			{
				name: "employees",
				img: "http://res.cloudinary.com/ind-pendant/image/upload/v1486511329/employees_pqs8fr.png",
				id: 5
			},
			{
				name: "damien",
				img: "http://res.cloudinary.com/ind-pendant/image/upload/v1486511329/damien_xzrsu4.jpg",
				id: 6
			}
		];
	    
		Memory.init(cards);


	})();
});