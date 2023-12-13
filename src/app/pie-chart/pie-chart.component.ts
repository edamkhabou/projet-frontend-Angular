import { Component, OnInit } from '@angular/core';
import {Chart,registerables} from 'chart.js';
import { PieChartService } from './pie-chart.service';
import { Produits } from './produits';
@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {
   public chart: any;
   constructor(private produitServ:PieChartService) {     Chart.register(...registerables);
   }
   public async ngOnInit()  {
    this.loadpourcentage( );
    this. loadpourcentageQuantite();
    const sleep = (ms)=>new Promise(r=> setTimeout(r,ms));
    console.log('1');
    await sleep(50) ;
    console.log(this.pourcentagecat);
    this.createChart();
    this.loadData();
    this.loadproduitpluscher()
    this.loadproduitmoinscher()
    this.loadallproduits()
    }

  key: Number[] = [];
  value: String[] = [];
  key1: Number[] = [];
  value1: String[] = [];
  public pc!: Map<String,Number>;
   series1: Number[] = [];
   titre: string[] = [];
   selectedDate:string = '';
   pourcentagecat : Map<String,Number>;
public p1:Produits;
produit : Object
   categorie: Object
   loadallproduitsdesc(){
    this.produitServ.getProduitsDesc().subscribe((data)=>{
      this.produit = data;
    })
   }
   loadallproduitsasc(){
    this.produitServ.getAllProduitsPrixAscd().subscribe((data)=>{
      this.produit = data;
    })
   }
   loadallproduits(){
  this.produitServ.getAllProduits().subscribe((data)=>{
    this.produit = data;
  })
}
loadallcategories(){
  this.produitServ.getAllCategories().subscribe((data)=>{
    this.categorie = data;
  })
}
   loadproduitpluscher(){
    this.produitServ.getProduitPlusCher().subscribe((data)=>{
      this.p1 = data;
      console.log('proddddddddd'+this.p1.designation)
    })
   }
   public p2:Produits;
   loadproduitmoinscher(){
    this.produitServ.getProduitMoinsCher().subscribe((data)=>{
      this.p2 = data;
      console.log('proddddddddd'+this.p2.designation)
    })
   }
   loadpourcentageQuantite(){
    this.produitServ.getPourcentageParQuant().subscribe((data)=>{
      this.pc = data;
      this.loadquantite();
    })
   }
    loadpourcentage(){
      this.produitServ.getPourcentageCategorie().subscribe((data) => {
        this.pourcentagecat = data;
        this.loadcat();
        // this.loadcat()
        // this.keysList = Array.from(this.pourcentagecat.keys());
        // this.valuesList = Array.from(this.pourcentagecat.values());
       // console.log(this.pourcentagecat);
    });
    }
    loadData() {
      // Utilisez la date sélectionnée du formulaire
      this.produitServ.afficherPourcentageQuantiteVenduetous(this.selectedDate).subscribe((res: any) => {
        if (res && typeof res === 'object') {
          for (let category in res) {
            if (res.hasOwnProperty(category)) {
              let percentage = res[category];
              console.log(`produit is: ${category} and percentage is: ${percentage}`);
              this.key1.push(percentage);
              this.value1.push(category);
            }
          }
  
          // Afficher le graphique
          this.chart = new Chart('canvas1', {
            type: 'line',
            data: {
              labels: this.value1,
              datasets: [
                {
                  label: 'Pourcentage',
                  data: this.key1,
                  borderWidth: 3,
                  fill: false,
                  backgroundColor: 'rgba(93,175,89,0.1)',
                  borderColor: '#3e95cd',
                },
              ],
            },
          });
        } else {
          console.error("Type de données inattendu pour la réponse :", res);
          // Gérer d'autres types de données si nécessaire
        }
      });
    }
  
    loadquantite(){
      if (typeof this.pc === 'object' && !Array.isArray(this.pourcentagecat)) {
        for (let category in this.pc) {
          if (this.pc.hasOwnProperty(category)) {
            let percentage = this.pc[category];
            console.log(`Categoryx is: ${category} and percentagex is: ${percentage}`);
            this.key.push(percentage);
            this.value.push(category);          
          }
      }
      this.chart = new Chart('canvas', {
        type: 'bar',
        data: {
          labels: this.value,
          datasets: [
            {
              label: 'Pourcentage',
              data: this.key,
              borderWidth: 3,
              backgroundColor: 'rgba(93,175,89,0.1)',
              borderColor: '#3e95cd',
            },
          ],
        },
      });
    }
  }
    loadcat() {
      if (typeof this.pourcentagecat === 'object' && !Array.isArray(this.pourcentagecat)) {
        for (let category in this.pourcentagecat) {
            if (this.pourcentagecat.hasOwnProperty(category)) {
                let percentage = this.pourcentagecat[category];
                console.log(`Category is: ${category} and percentage is: ${percentage}`);
                this.series1.push(percentage);
                this.titre.push(category);
            }
        }
    } else {
        console.error("Unexpected data type for this.pourcentagecat:", this.pourcentagecat);
        // Handle other data types if needed
    }
  }
  createChart(){
console.log(this.series1);
    this.chart = new Chart("MyChart", {
      type: 'pie', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.titre,
	       datasets: [{
    label: 'Categorie',
    data: this.series1,
    
    hoverOffset: 4
  }],
      },
      options: {
        aspectRatio:2.5
      }

    });
  }
  onDateChange() {
    // Chargez les données à partir de l'API en utilisant la nouvelle date sélectionnée
    this.loadData();
  }
}
