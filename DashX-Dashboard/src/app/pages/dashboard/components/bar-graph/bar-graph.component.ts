import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { BarGraphData } from '../../models';
import { BarChart, BarChartOptions } from '../../defaults/barChart'
import { ChartComponent } from "ng-apexcharts";
import { ChartEditorService } from '../../services'


@Component({
  selector: 'app-bar-graph',
  templateUrl: './bar-graph.component.html',
  styleUrls: ['./bar-graph.component.css']
})
export class BarGraphComponent implements OnInit{
  
  public chart: Partial<BarChartOptions>;
  barChartDefaults : BarChart;
  isEditorOpen : boolean

  @Input() barGraphData: BarGraphData;
  @ViewChild ('chartObj') chartObj : ChartComponent;

  constructor(private data : ChartEditorService){

  }

  ngOnInit(): void {
    this.barChartDefaults = new BarChart();
    this.chart = this.initChart()
    this.data.isEditorOpen_current.subscribe( isOpen => this.isEditorOpen = isOpen )
  }

  //#region component functions

  //to update the chart options
  updateChart( chartOption : Partial<BarChartOptions> ){
    this.chartObj.updateOptions(
      chartOption
    );
  }
  
  // to open chart editor
  EditChart()
  {
    this.data.ToggleEditor(!this.isEditorOpen);
  }

  public initChart(): Partial<any> {
   return  this.barChartDefaults.GetDefaults()
  }

  //#endregion
}
