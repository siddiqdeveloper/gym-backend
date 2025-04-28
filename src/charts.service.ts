import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';


@Injectable()
export class ChartsService {
  constructor(
    private dataSource: DataSource,

  ) {}



  
  async generateChartData(data){

    const reportType = data.reportType; // Example input
    const startDate = data.customStartDate;
    const startEnd = data.customEndDate;
    let metric = data.metric;

    if(!metric){
      metric = 'count';
    }
    let metric_column = '';
    let date_column = '';
    let table = '';
    let wherecondition = '';
    let left_join_val = '';

    // Assign table and date_column based on reportType
    if (reportType === 'newmembers') {
      table = 'members';
      left_join_val = ' inner JOIN payments AS pt ON pt.memberId = m.id'; 
      wherecondition = 'pt.memberPaymentFor = "NEW"';
      metric_column = 'id';
      date_column = 'joiningDate';

      
   
    } else if (reportType === 'trainer_wise') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'new_member') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'renewal_member') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'inactive_member') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'active_member') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'male_member') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'female_member') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'topselling_reports') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'low_selling') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'collection_reports') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'payment_discount') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'package_complementary') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'package_offer') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'payment_refund') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'half_of_year_member') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'quaterly_member') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'annual_member') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'annual_sales') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'staff_performance') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'manger_wise') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'collection_manager') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'check_list') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'service_wise') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'cancel_member') {
      table = 'members';
      date_column = 'joiningDate';
    } else if (reportType === 'personal_training') {
      table = 'members';
      date_column = 'joiningDate';
    } else {
      console.error('Invalid report type!');
    }
    console.log(metric)
    const result = await this.dataSource.query(
      `CALL getGenerateChartData(?, ?, ?, ?, ?, ?, ?,?)`,
      [startDate, startEnd, metric, metric_column, date_column, table, wherecondition,left_join_val],
    );

    return result[0];



  }

  async currentMonthFollowup() {
    const result = await this.dataSource.query('CALL currentMonthFollowup()');
    let data = result[0];
    console.log(data)

    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    let dateArray = [];
    let valuesArray = [];

    // Generate all dates of the current month with default 0 values
    for (let day = 1; day <= daysInMonth; day++) {
        let formattedDate = new Date(year, month, day).toISOString().split('T')[0]; // Format YYYY-MM-DD
        dateArray.push(formattedDate);
        valuesArray.push(0); // Default count = 0
    }

    // If there are database results, update valuesArray
    if (data && data.length > 0) {
        data.forEach(entry => {
            let index = dateArray.indexOf(entry.followup_date);
            if (index !== -1) {
                valuesArray[index] = parseFloat(entry.count); // Update with actual count from DB
            }
        });
    }



    return {lables:dateArray,values:valuesArray};
  }

 

}
