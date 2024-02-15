import LocalStorageService from "./localStorageService.service";

import PolarPups from '../assets/PolarPups.png';
import FlyingPenguins from '../assets/FlyingPenguins.png';
import SailingSeals from '../assets/SailingSeals.png';
import Logo from '../assets/Logo.png';
//import RestStorageService from "./RestStorage.service";  //LMS6

let appViewModel = {

  app: {
    header: {
      logo: Logo,
      title: "Blizzard Snowboarding League",
    },
    
    isMock: true,
  
    // endPoint: 
    //   host: "localhost",
    //   port: "8080",
    //   protocol: "http",
    //   apiPrefix:"api/v1"
    // },

    //endPoint: {

      //host: "kjj-teams-api-fall23-env.eba-wa2da9ar.us-east-1.elasticbeanstalk.com",

      //port: "80",

      //protocol: "http"

   // },

  },

  entities: {

    teams: {
      entity: "teams", //key used for LocalStorage
      entitySingle: "team",
      nameCol: "name",  
          /* I used this so I could make the delete confirmation generic, 'Are you sure you want to delete (name for teams, full_name for player)*/

      list: {
        options: {
          sortCol: "name",
          sortDir: "asc",
          filterStr: "",
          filterCol: "name",
          limit: 50,
          offset: 0,
        },

        listTitle: "BSL Teams",
        tableClasses: "table table-dark table-hover mt-2", //classes for table tag
        thClasses: "bg-black bg-gradient", //classes for my th tags (you may not need)
        columns: [
          {
            label: "Name",
            name: "name",
          },
          {
            label: "Coach Name",
            name: "coachName",
          },
          {
            label: "Motto",
            name: "motto",
          },
          {
            label: "Notes",
            name: "notes",
          },
        ],

      },
      data: [
        {
          id: 1,
          league_id: 1,
          name: "Sailing Seals",
          notes: "we need to win",
          logo_path: SailingSeals,
          motto: "We are the best!",
          coach_id: 1,
          coachName: "Josh Clark",
          coachPhone: "123-456-7890",
          numberOfPlayers: "11",
          coachEmail: "josh.clark@uvu.edu",
        },
        {
          id: 2,
          league_id: 1,
          name: "Polar Pups",
          logo_path: PolarPups,
          notes: "we need to win",
          motto: "Our team rocks!",
          coach_id: 2,
          coachName: "Tait Draper",
          coachPhone: "234-567-8901",
          numberOfPlayers: "13",
          coachEmail: "tait.draper@uvu.edu",
        },
        {
          id: 3,
          league_id: 1,
          name: "Flying Penguins",
          logo_path: FlyingPenguins,
          notes: "we need to win",
          motto: "We will bury you!",
          coachId: 3,
          coachName: "Shaun White",
          coachPhone: "345-678-9012",
          numberOfPlayers: "12",
          coachEmail: "shaun.white@uvu.edu",
        },
      ],
      lookups: {
        coaches: [
          {
            label: "Josh Clark",
            value: 1,
          },
          {
            label: "Shaun White",
            value: 2,
          },
        ],
      }
    },
    players: {
      entity: "players",
      entitySingle: "player",
      nameCol: "full_name",
      list: {
        options: {
          sortCol: "full_name",
          sortDir: "asc",
          filterStr: "",
          filterCol: "full_name",
          limit: 50,
          offset: 0,
        },

        listTitle: "Current BSL Teams",
        tableClasses: "table table-dark table-hover mt-2", //classes for table tag
        thClasses: "bg-black bg-gradient", //classes for my th tags (you may not need)

        columns: [
          {
            label: "Name",
            name: "full_name",
          },
          {
            label: "Team",
            name: "team_name",
          },
          {
            label: "Address",
            name: "full_address",
          },
          {
            label: "Phone",
            name: "phone",
          },
          {
            label: "Email",
            name: "email",
          },
        ],
      },    

      data: [
        {
          id: 3,
          first_name: "Gabe",
          last_name: "Jenson",
          address1: "1527 N. 230 w.",
          address2: "Apt. 3",
          notes: "My notes",
          city: "Orem",
          state: "UT",
          zip: "1",
          team_id: 1,
          email: "gjenson@gmail.com",
          phone: "801-333-4444",
          password: "mypassword",
          user_name: "gjenson",
          license_level_id: 1,
          person_type: "player",
          full_name: "Gabe Jenson",
          full_address: "1527 N. 230 w. Apt. 3, Orem UT 84664",
          team_name: "Raptors",
        },
        {
          id: 4,
          first_name: "Hannah",
          last_name: "Jenson",
          address1: "1527 N. 230 w.",
          address2: "Apt. 3",
          notes: "My notes",
          city: "Orem",
          state: "UT",
          zip: "1",
          team_id: 2,
          email: "h.jenson@gmail.com",
          phone: "801-333-4444",
          password: "mypassword",
          user_name: "hjenson",
          license_level_id: 1,
          person_type: "player",
          full_name: "Hannah Jenson",
          full_address: "1527 N. 230 w. Apt. 3, Orem UT 84664",
          team_name: "Killer Bunnies",
        },
        {
          id: 9,
          first_name: "Alvis",
          last_name: "Bechtelar",
          address1: "661 Ritchie Village",
          address2: "",
          notes: "visualize synergistic supply-chains",
          city: "Bogisichville",
          state: "UT",
          zip: "84556",
          team_id: 3,
          email: "rachel_conroy92@gmail.com",
          phone: "669-664-2379",
          password: "password",
          user_name: "kjenson",
          license_level_id: 1,
          person_type: "player",
          full_name: "Alvis Bechtelar",
          full_address: "661 Ritchie Village Bogisichville UT 84556",
          team_name: "ThuderBirds",
        },
        {
          id: 10,
          first_name: "Tate",
          last_name: "Anderson",
          address1: "358 Hirthe Glens",
          address2: "",
          notes: "implement best-of-breed relationships",
          city: "Lake Maximilianfurt",
          state: "UT",
          zip: "84556",
          team_id: 2,
          email: "bradford_rutherford6@hotmail.com",
          phone: "558-580-8071",
          password: "password",
          user_name: "kjenson",
          license_level_id: 1,
          person_type: "player",
          full_name: "Tate Anderson",
          full_address: "358 Hirthe Glens, Lake Maximilianfurt UT 84556",
          team_name: "Killer Bunnies",
        },
      ],

      lookups: {
        teams: [
          {
            label: "Sailing Seals",
            value: 3,
          },
          {
            label: "Flying Penguins",
            value: 1,
          },
          {
            label: "Polar Pups",
            value: 2,
          },
        ],
      }
    },
  },

  getApi(entity) {

    let model = this.entities[entity];
    console.log(entity)
    if (this.app.isMock) {
      console.log("in here")
      return new LocalStorageService(model, entity);
    } else {
      //LMS6 Only
      //return new RestStorageService(
        //entity,
       // this.app.endPoint,
       // model.list.options
     // );
    }
  },
};

export default appViewModel;