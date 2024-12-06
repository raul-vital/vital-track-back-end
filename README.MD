# Vital Track - A Workout Manager
[Vital Track](https://vitaltrack.netlify.app/) 

### Front-End 
* [Vital Track ](https://github.com/raul-vital/vital-track-front-end)
* [Planning Materials](https://trello.com/b/HQf7JyMi/vital-track)

## RESTful Routes
 | HTTP Method | Controler      | Response | URI                           | Use Case               |
|-------------|----------------|----------|-------------------------------|------------------------|
| POST        | createRoute    | 200      | /workouts                     | Create a workout       |
| GET         | indexRoute     | 200      | /workouts                     | List workouts          |
| GET         | showRoute      | 200      | /workouts/:workoutId          | Get a single workout   |
| PUT         | updateRoute    | 200      | /workouts/:workoutId          | Update a workout       |
| DELETE      | deleteRoute    | 200      | /workouts/:workoutId          | Delete a workout       |
| POST        | createProgress | 200      | /workouts/:workoutId/progress | Create a progress card |