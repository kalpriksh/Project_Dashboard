import { Component, OnInit, ViewEncapsulation, ViewChild, ComponentFactoryResolver, ViewContainerRef, Input } from '@angular/core';
import { LineChartData, PieChartData, BarGraphData, KpiData, Dashboard } from '../../models';
import { NewChartTabDirective } from '../../directives/new-chart-tab.directive'
import { of } from "rxjs";
//components

//gridster
import { GridsterConfig, GridsterItem }  from 'angular-gridster2';

//services
import { ChartContainerService } from "../../services/chart-container.service";
import { DashboardService } from "../../services";
@Component({
  selector: 'app-charts-container',
  templateUrl: './charts-container.component.html',
  styleUrls: ['./charts-container.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class ChartsContainerComponent implements OnInit {
  /**
   * pass dashboard object to this class
   * dashboard object should contain : child chart components
   * chart components needs to loaded dynamically
   */

  @ViewChild(NewChartTabDirective, {static: true}) newChart: NewChartTabDirective;

  public lineChartData: LineChartData;
  public pieChartData: PieChartData;
  public barGraphData: BarGraphData;

  showChartTypesList = false
  _dashboard : Dashboard 

  // list of chart types {placeholder}
  listOfChartTypes : any[]

  // dummy chart data
  barChartDummyData : BarGraphData
  kpiDummyData : KpiData
  pieChartDummyData : PieChartData
  lineChartDummyData : LineChartData

  //gridster properties
  options: GridsterConfig;
  dashboard: Array<GridsterItem>;

  constructor(private dashboardService: DashboardService, private componentFactoryResolver : ComponentFactoryResolver, private chartContainerService : ChartContainerService) {
    this._dashboard = dashboardService.loadDashboardData()
  }

  //#region gridster static methods 
  static itemChange(item, itemComponent) {
    console.info('itemChanged', item, itemComponent);
  }

  static itemResize(item, itemComponent) {
    console.info('itemResized', item, itemComponent);
  }
  //#endregion

  ngOnInit(): void {
    // bind deleteChart function to service's delete chart function
    this.chartContainerService.DeleteSelectedChart(this.DeleteChart.bind(this))
    //initialize listOfChartTypes
    this.listOfChartTypes = this.dashboardService.GetListOfChartTypes()
    
    //#region gridster init
    this.options = {
      itemChangeCallback: ChartsContainerComponent.itemChange,
      itemResizeCallback: ChartsContainerComponent.itemResize,
    };

    this.dashboard = [
      {cols: 2, rows: 1, y: 0, x: 0},
      {cols: 2, rows: 2, y: 0, x: 2}
    ];
    //#endregion

  }

  //#region gridster method
  changedOptions() {
    this.options.api.optionsChanged();
  }

  removeItem(item) {
    this.dashboard.splice(this.dashboard.indexOf(item), 1);
  }

  addItem() {
    this.dashboard.push();
  }
  //#endregion

  
  AddChart(chartType : string){
    /**
     * add chart type on selection basis 
     * dynamically load chart component
     */
    if(chartType.toUpperCase() == "BAR")
    {
      this._dashboard.charts.push(this.dashboardService.GetDefaultBarDashboardObject())
    }
    if(chartType.toUpperCase() == "PIE")
    {
      this._dashboard.charts.push(this.dashboardService.GetDefaultPieDashboardObject())
    }
    if(chartType.toUpperCase() == "KPI")
    {
      this._dashboard.charts.push(this.dashboardService.GetDefaultKpiDashboardObject())
    }
    if(chartType.toUpperCase() == "LINE")
    {
      this._dashboard.charts.push(this.dashboardService.GetDefaultLineDashboardObject())
    }

    this.showChartTypesList = false;
  }
  

  DeleteChart(chartId)
  {
    /**
     * will be called from chart itself using chart-container service
     * remove from UI
     * update dashboard
     */
    
    //filter out the chart not required based on id
    var filteredData = this._dashboard.charts.filter((chartData) => {
      return chartData.chartID != chartId
    })
    this._dashboard.charts = filteredData

  }

  SaveDashboard(){
    /**
     * creates dashboard object
     * returns the object to be saved
     */
    this.dashboardService.SaveDashboardData(this._dashboard)
  }

}
