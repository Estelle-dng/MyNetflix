function getListeSeries(table){
	var xmlHttpSeries = getAjaxRequestObject();
	xmlHttpSeries.onreadystatechange = function() {
		if (this.readyState === 4 && this.status === 200) {
			var text= this.responseText;
			var lesSeries = JSON.parse(text);
			lesSeries.sort(function(a, b){
				if (a.nom < b.nom){
					return -1;
				}else if (a.nom > b.nom){
					return 1;
				}else{
					return 0;
				}
			});

			for(var i=0;i<lesSeries.length;i++){
				var row = table.insertRow(i);
				var cellnom = row.insertCell(0);
				var cellannee = row.insertCell(1);
				var cellSaisons = row.insertCell(2);
				var cellResume = row.insertCell(3);
				cellnom.innerText = lesSeries[i].nom;
				cellannee.innerText = lesSeries[i].anneeparution;
				cellResume.innerText = lesSeries[i].synopsys;
				var img = document.createElement('img');
				cellSaisons.appendChild(img);
				img.style.width = '24px';
				img.style.cursor = 'pointer';
				img.src = 'includes/images/details_blue.png';
				img.id = lesSeries[i].id;

				img.onclick = function() {
					getSaisons(this.id);
				}
			}
		}
	};
	xmlHttpSeries.open("GET", "../api-netflix/api.php?data=series");
	xmlHttpSeries.send();
}

function getSaisons(id){
	console.log(id);
	var xmlHttpSaisons = getAjaxRequestObject();
	xmlHttpSaisons.onreadystatechange = function(){
		if (this.readyState === 4 && this.status === 200){
			try{

				var tableSaisons = document.querySelector('#tbSaisons');
				tableSaisons.style.display = '';

				var text= this.responseText;
				var lesSaisons = JSON.parse(text);
				lesSaisons.sort(function(a, b){
					if (parseInt(a.numero, 10) < parseInt(b.numero, 10)){
						return -1;
					}else if (parseInt(a.numero,10) > parseInt(b.numero, 10)){
						return 1;
					}else{
						return 0;
					}
				});

				var tbodySaisons = document.querySelector('#tbSaisons>tbody');
				tbodySaisons.innerHTML = '';
				for(var i=0;i<lesSaisons.length;i++) {

					var row = tbodySaisons.insertRow(i);
					var cellnumero = row.insertCell(0);
					var cellAnnee = row.insertCell(1);
					var cellEpisodes = row.insertCell(2);

					cellnumero.innerText = lesSaisons[i].numero;
					cellAnnee.innerText = lesSaisons[i].annee_diffusion;

					var img = document.createElement('img');
					cellEpisodes.appendChild(img);
					img.style.width = '24px';
					img.style.cursor = 'pointer';
					img.src = 'includes/images/details_blue.png';
					img.id = lesSaisons[i].id;

					img.onclick = function() {
						getEpisodes(this.id);
					}
				}
			}catch (e){

				document.querySelector('#tbSaisons>tbody').innerHTML = ('<tr><td colspan="3">Pas de saisons</td></tr>');
			}
		}
	};
	xmlHttpSaisons.open("GET", "../api-netflix/api.php?data=saisons&idserie=" + id);
	xmlHttpSaisons.send();
}


