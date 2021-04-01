# Custom-ui-dashboard

# Getting started

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

# Verify if csv data has successful populated in mongodb
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

# Resetting the static data database

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
   