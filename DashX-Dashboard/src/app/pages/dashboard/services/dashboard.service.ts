import { Injectable } from '@angular/core';
import { LineChartData, PieChartData } from '../models';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  
  public loadPieChartData(): PieChartData{
    return{
      series: [44, 55, 13, 43, 22],
      labels:["Team A", "Team B", "Team C", "Team D", "Team E"]
    };
  }
  public loadLineChartData(): LineChartData{
    return{
      name: "Desktops",
      data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      categories: [    "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep"
      ]

    };
  }
}
