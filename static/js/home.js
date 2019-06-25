$(document).ready(function(){
			$('form').submit(function(event){
				event.preventDefault();
				var userInput = $('#search').val();
				$.get('https://pokeapi.co/api/v2/pokemon/' + userInput + '/', function(pokemon){
					console.log(pokemon);
					$('div.poke-name').html("<h2 class='title'>" + pokemon.name + "</h2>");
					var list = [];
					for (var i = 0; i < 2; i++) {
						 var ability = pokemon.abilities[i].ability.name;
						 list.push(ability);
						$('span.abilities').html("<p>" + list + "</p>");
					}
					var list =[];
					var array = pokemon.moves
					for (var m = 0; m < array.length; m++){
						var move = pokemon.moves[m].move.name;
						list.push(move);
						if(m == 3){
							break;
						}
						$('span.poke-moves').html("<p>" + list + "</p>");
						console.log("Move:" + " " +  list);
					}
					$.get(pokemon.species.url, function(data){
						var array = data.flavor_text_entries;
						for(var t = 0; t < array.length; t++){
							console.log(data.flavor_text_entries[t])
							if(data.flavor_text_entries[t].language.name == "en"){
								$('span.poke-text').html("<p class='summary'>" + data.flavor_text_entries[1].flavor_text + "</p>");
							}
						}
					})
					$.get(pokemon.species.url, function(data){
						var species = data.egg_groups
						var list = [];
						species.forEach(function(object){
							var name = object.name;
							list.push(name);
							$('span.poke-species').html("<p>" + list + "</p>");
							console.log("type:" + " " + object.name);
						})
					})
					$.get(pokemon.species.url, function(data){
						$('span.habitat').html("<p>" + data.habitat.name + "</p>" );
					})
					$('span.poke-height').html("<p>" + pokemon.height + "m" + "</p>");
					$('span.poke-weight').html("<p>" + pokemon.weight + "kgs" + "</p>");
					$('div.poke-image').html("<img src=" + pokemon.sprites.front_default + ">");

					$.get(pokemon.species.url, function(data){
						console.log(data);
						if(data.evolves_from_species == null){
							$('span.evolve').html("<p>" + "None" + "</p>")
						}
						else {
							var evolve_form = data.evolves_from_species.name;
							$('span.evolve').html("<p>" + evolve_form + "</p>")
						}
					})
				}, "JSON")
			})
		})