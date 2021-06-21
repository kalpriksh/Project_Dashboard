import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { ChartEditorService } from '../../services'
import { LineChart, LineChartOptions } from '../../component-classes'
import { ChartComponent } from "ng-apexcharts";


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})

export class LineChartComponent implements OnInit {

  public chart: Partial<LineChartOptions>;

  lineChart : LineChart;
  isEditorOpen : boolean
  chartData : Partial<LineChartComponent>
  editorState

  @Input() lineChartData: Partial<LineChartOptions>;
  @ViewChild ('chartObj') chartObj : ChartComponent

  constructor(private editorData : ChartEditorService){}

  ngOnInit(): void {

    this.lineChart = new LineChart(this.editorData.UID());
    this.chart = this.initChart()

    if(this.lineChartData)
    {
      this.chart.series = this.lineChartData.series;
      this.chart.xaxis = this.lineChartData.xaxis;
    }
    
    // on toggle edit chart
    this.editorData.isEditorOpen_current.subscribe(_editorState => {
      this.isEditorOpen = _editorState[0]
      this.editorState = _editorState
    })

    // on data modified event
    this.editorData.editorData_current.subscribe( _modifiedChartObject => {

      if(this.chartObj != null){
        //update if chartType and chartID is the same
        if(_modifiedChartObject.chartType == this.lineChart.chartType && _modifiedChartObject.chartId == this.lineChart.chartId){
          this.chartData = _modifiedChartObject
          this.updateChart(_modifiedChartObject.chartData)
          this.lineChart = _modifiedChartObject
        }
      }
    })

  }

  //to update the chart options
  updateChart( chartOption : Partial<LineChartOptions> ){
    this.chartObj.updateOptions(
      chartOption
    );
  }

  // to open chart editor
  EditChart(){
    
    if(this.isEditorOpen){
      //if editor is already open
      if(this.editorState[1] == this.lineChart.chartId){
        // chart data is already loaded on the editor
        this.editorData.ToggleEditor(!this.editorState[0], this.lineChart.chartId);
      } 
      else{
        // need to load chart data on editor
        this.editorData.ToggleEditor(this.editorState[0], this.lineChart.chartId)
        this.editorData.EditorDataUpdated(this.lineChart)
      }
    }
    else{
      this.editorData.ToggleEditor(!this.editorState[0], this.lineChart.chartId)
      this.editorData.EditorDataUpdated(this.lineChart)
    }
  }

  /**
   * to the delete the selected chart
   */
  DeleteChart(){

  }

  public initChart(): Partial<LineChartOptions> {
    return this.lineChart.GetDefaults();
  }

}

