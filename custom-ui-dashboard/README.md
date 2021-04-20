# Custom-ui-dashboard
View of application

![UI interface](https://github.com/hwbjerry/CS3249-assignment-4/blob/d9c282175c2ddd2ed4a76daeef5f60fb121fb6ab/custom-ui-dashboard/imports/img/UI.png)

## Getting started

1. Clone this repository. 
   
   Run the command in terminal
   
   ```bash
   git clone git@github.com:hwbjerry/CS3249-assignment-4.git
   ```
   
2. Change directory to the folder. 
   
   Run the command in terminal
   
   ```bash
   cd ../custom-ui-dashboard
   ```
   
3. Install meteor npm packages.
   
   Run the command in terminal
   
   ```bash
   meteor npm install
   ```
4. Start the application.
   
   Run the command in terminal

   ```bash
   meteor run
   ```

## Verify if csv data has successful populated in mongodb
1. Start the application.
   
   Run the command in terminal

   ```bash
   meteor run
   ```

2. Open another terminal window.

   Run the command in terminal

   ```bash
   meteor mongo
   ```

   This will open up mongodb shell.

3. Show all databases and select ``meteor``.

   Run the command in the terminal

   ```bash
   show dbs
   use meteor
   ```
   
4. Show all collections in meteor and select ``temperature_data`` to be dropped.

   Run the command in terminal

   ```bash
   show collections
   db.temperature_data.count()
   ```
   
   If the shell reflects ``38962`` that means all data from the csv has been successfully been transferred.
   
   Otherwise, see documentation for [Resetting the static data database](#Resetting the static data database) use step 4. 
   Next, close all terminal windows and startup the application again.

## Resetting the static data database

1. Start the application.
   
   Run the command in terminal

   ```bash
   meteor run
   ```

2. Open another terminal window.

   Run the command in terminal

   ```bash
   meteor mongo
   ```

   This will open up mongodb shell.

3. Show all databases and select ``meteor``.

   Run the command in the terminal

   ```bash
   show dbs
   use meteor
   ```
   
4. Show all collections in meteor and select ``temperature_data`` to be dropped.

   Run the command in terminal

   ```bash
   show collections
   db.temperature_data.drop()
   ```
   
   The collection ``temperature_data`` has successful been dropped when shell reflects ``true``.
   
## Usage
**Sampling selection**

*Interval Selection*

      1. Select the date time textbox
      2. A calendar dropdown will appear 
         
         a. Modify the textbox directly
         
         b. Modify by selecting the start datetime followed by the end datetime
      
   ![Interval Selection textbox](https://github.com/hwbjerry/CS3249-assignment-4/blob/c8fcb00b8147d3b8eeee92f675cb98515d8c564a/custom-ui-dashboard/imports/img/DateTimeRange.png)

   ![Interval Selection dropdown calendar](https://github.com/hwbjerry/CS3249-assignment-4/blob/c8fcb00b8147d3b8eeee92f675cb98515d8c564a/custom-ui-dashboard/imports/img/DateTimeRangeDropdown.png)
   


*Sample Points Selection*

      Drag the slider bar to adjust the nubmer of sample points to be reflected on the graph. 
      Current samples will reflect the selected amount of samples to be shown.
   
   ![Room Selection Image](https://github.com/hwbjerry/CS3249-assignment-4/blob/c8fcb00b8147d3b8eeee92f675cb98515d8c564a/custom-ui-dashboard/imports/img/SampleRange.png)

*Room Selection*

      Click on the room number in the floor plan to toggle ON/OFF a room. 
      
      When OFF, the background of room rectangle will turn 'white'. The graph will not reflect the data points for the room.
      
      When ON, the background of room rectangle will turn 'blue'. The graph will reflect the data points for the room in the colour shown in the legend above the graph.

   ![Room Selection Image](https://github.com/hwbjerry/CS3249-assignment-4/blob/c8fcb00b8147d3b8eeee92f675cb98515d8c564a/custom-ui-dashboard/imports/img/FloorPlan.png)

**Graph zoom and pan**

   Zoom

      1. Hover over the graph. 'Cursor icon' as the cursor will be seen. If not proceed to step 2. Otherwise, skip step 2.
      2. Hover over the magnifying glass button at the top right of the graph ('zoom' will be shown in the tooltip).
         This shows the graph is not in zoom mode. Select the button to active 'zoom' mode.
      3. Click on the graph(start point) drag it across to the end point of the preferred zoom range.
   
   ![Zoom Video](/imports/img/Zoom.mov)   

   Pan

      1. Hover over the graph. 'Arrowed cross icon' as the cursor will be seen. If not proceed to step 2. Otherwise, skip step 2.
      2. Hover over the arrowed cross button at the top right of the graph ('pan' will be shown in the tooltip). 
         This shows the graph is not in pan mode. Select the button to active 'pan' mode. 
      3. Click and Drag on the graph to view selected interval.
   
   ![Pan Video](/imports/img/Pan.mov)
      

## Developers
   - Ho Wei Bin, Jerry [(github)](https://github.com/hwbjerry)
   - Michelle Toh Hui Ping [(github)](https://github.com/0325961)
