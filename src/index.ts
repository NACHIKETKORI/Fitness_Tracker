const readline = require('readline');
import { FitnessTracker } from './fit';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const tracker = new FitnessTracker();

function promptUser() {
  function askOption() {
    rl.question('Choose an option: \n1. Add User\n2. Log Workout\n3. Get All Workouts\n4. Get Workouts by Type\n5. Get Users\n6. Get User\n7. Update User\n8. Exit\nEnter your choice: ', (choice:string) => {
      switch (choice) {
        case '1':
          rl.question('Enter name: ', (name: string) => {
            rl.question('Enter age: ', (age:string) => {
              rl.question('Enter weight: ', (weight: string) => {
                rl.question('Enter height: ', (height:string) => {
                  tracker.addUser({ name, age: Number(age), weight: Number(weight), height: Number(height) });
                  askOption();
                });
              });
            });
          });
          break;
        case '2':
          rl.question('Enter user ID: ', (userId:string) => {
            rl.question('Enter workout type: ', (type:string) => {
              rl.question('Enter duration (minutes): ', (duration:string) => {
                rl.question('Enter calories burned: ', (caloriesBurned:string) => {
                  tracker.logWorkout(userId, { type, duration: Number(duration), caloriesBurned: Number(caloriesBurned), date: new Date() });
                  console.log('Workout logged successfully!');
                  askOption();
                });
              });
            });
          });
          break;
        case '3':
          rl.question('Enter user ID: ', (userId:string) => {
            console.log(tracker.getAllWorkoutsOf(userId));
            askOption();
          });
          break;
        case '4':
          rl.question('Enter user ID: ', (userId:string) => {
            rl.question('Enter workout type: ', (type:string) => {
              console.log(tracker.getAllWorkoutsByType(userId, type));
              askOption();
            });
          });
          break;
        case '5':
          console.log(tracker.getUsers());
          askOption();
          break;
        case '6':
          rl.question('Enter user ID: ', (id:string) => {
            console.log(tracker.getUser(id));
            askOption();
          });
          break;
        case '7':
          rl.question('Enter user ID: ', (id:string) => {
            rl.question('Enter field to update (name, age, weight, height): ', (field:string) => {
              rl.question('Enter new value: ', (value:string) => {
                tracker.updateUser(id, { [field]: isNaN(Number(value)) ? value : Number(value) });
                console.log('User updated successfully!');
                askOption();
              });
            });
          });
          break;
        case '8':
          console.log('Exiting...');
          rl.close();
          break;
        default:
          console.log('Invalid option. Exiting...');
          rl.close();
      }
    });
  }
  askOption();
}

promptUser();
