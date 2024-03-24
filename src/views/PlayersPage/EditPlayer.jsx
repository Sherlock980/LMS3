import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { PlayersContext, TeamsContext } from '../../services/contexts'; // Import TeamsContext

import { Container, Form, Button } from 'react-bootstrap';
import { Controller } from 'react-hook-form';

function EditPlayer({ isCreate }) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phonePattern = /^[0-9]{3}-[0-9]{3}-[0-9]{4}$/;
  const usernamePattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
  const [selectedTeam, setSelectedTeam] = useState(null);
  const { api } = useContext(PlayersContext);
  const { api: teamsApi } = useContext(TeamsContext);

  const navigate = useNavigate();
  const { id } = useParams();
  const { register, handleSubmit, setValue, control, formState: { errors } } = useForm();
  const [teamOptions, setTeamOptions] = useState([]);
  const [alert, setAlert] = useState(null);
  

  // Fetching team options for dropdown
  useEffect(() => {
    console.log("Fetched teams for dropdown:", teamOptions);
    teamsApi.list() // Assuming .list() or a similar method fetches all teams
    .then(teams => {
      const teamOptions = teams.map(team => ({ label: team.name, value: String(team.id) })); // Convert team.id to string
      setTeamOptions(teamOptions);
    })
    .catch(error => console.error("Failed to fetch teams", error));
      if (!isCreate && id) {
        api.read(id)
          .then(playerData => {
            Object.keys(playerData).forEach(key => {
              setValue(key, playerData[key]);
            });
            // Set the initial value for the team_id field
            setValue('team_id', playerData.team_id);
          })
          .catch(error => console.error("Failed to fetch player data", error));
      }
  }, [api, id, isCreate, setValue, teamsApi]);

  const onSubmit = async (data) => {
    console.log("Data before submission:", data);
    // Find the selected team's name and id
    const selectedTeam = teamOptions.find(team => team.value === data.team_id);
    console.log("Selected team data:", selectedTeam);
    const teamName = selectedTeam?.label;
    const teamId = selectedTeam?.value;
    // Include both team_id and team_name in the submission data
    const submissionData = { 
      ...data, 
      team_id: teamId, // Use the team ID instead of the team name
      team_name: teamName,
      full_name: `${data.first_name} ${data.last_name}`, // Update full_name as previously discussed
      full_address: `${data.address1} ${data.address2 ? data.address2 + ' ' : ''}${data.city}, ${data.state} ${data.zip}`,
      id: id // Make sure the id is correctly included
    };
  
    try {
      let result;
      if (isCreate) {
        result = await api.create(submissionData);
      } else {
        result = await api.update(submissionData); // Ensure 'update' method handles an object including 'id'
      }
      navigate("/players");
    } catch (error) {
      console.error("Failed to save player", error);
    }
    console.log("Submission Data:", submissionData);

  };



  
  

  return (
    <Container>
      <div className='edit-form'>
        <h1>{isCreate ? "Add Player" : "Edit Player"}</h1>
        <h6>Required Feilds *</h6>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          {/* First Name */}
          <Form.Group className="mb-3">
            <Form.Label>First Name *</Form.Label>
            <Form.Control
              type="text"
              {...register("first_name", { required: "First name is required" })}
              isInvalid={errors.first_name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.first_name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Last Name */}
          <Form.Group className="mb-3">
            <Form.Label>Last Name *</Form.Label>
            <Form.Control
              type="text"
              {...register("last_name", { required: "Last name is required" })}
              isInvalid={errors.last_name}
            />
            <Form.Control.Feedback type="invalid">
              {errors.last_name?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Address Line 1 */}
          <Form.Group className="mb-3">
            <Form.Label>Address 1 *</Form.Label>
            <Form.Control
              type="text"
              {...register("address1", { required: "Address is required" })}
              isInvalid={errors.address1}
            />
            <Form.Control.Feedback type="invalid">
              {errors.address1?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Address Line 2 */}
          <Form.Group className="mb-3">
            <Form.Label>Address 2</Form.Label>
            <Form.Control
              type="text"
              {...register("address2")}
            />
          </Form.Group>

          {/* City */}
          <Form.Group className="mb-3">
            <Form.Label>City *</Form.Label>
            <Form.Control
              type="text"
              {...register("city", { required: "City is required" })}
              isInvalid={errors.city}
            />
            <Form.Control.Feedback type="invalid">
              {errors.city?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* State */}
          <Form.Group className="mb-3">
            <Form.Label>State Code *</Form.Label>
            <Form.Control
              type="text"
              {...register("state", { required: "State Code is required", maxLength: { value: 2, message: "State must be 2 characters" } })}
              isInvalid={errors.state}
            />
            <Form.Control.Feedback type="invalid">
              {errors.state?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* ZIP Code */}
          <Form.Group className="mb-3">
            <Form.Label>ZIP Code *</Form.Label>
            <Form.Control
              type="text"
              {...register("zip", { required: "ZIP code is required", pattern: { value: /^[0-9]{5}$/, message: "ZIP must be 5 digits" } })}
              isInvalid={errors.zip}
            />
            <Form.Control.Feedback type="invalid">
              {errors.zip?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Email */}
          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              {...register("email", { required: "Email is required", pattern: { value: emailPattern, message: "Invalid email address" } })}
              isInvalid={errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Phone */}
          <Form.Group className="mb-3">
            <Form.Label>Phone * </Form.Label>
            <Form.Control
              type="tel"
              {...register("phone", { required: "Phone is required", pattern: { value: phonePattern, message: "Invalid phone number" } })}
              isInvalid={errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {errors.phone?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Team ID */}
          <Form.Group className="mb-3">
            <Form.Label>Team</Form.Label>
            <Controller
              name="team_id"
              control={control}
              rules={{ required: "Team selection is required" }}
              render={({ field }) => (
                <Form.Select {...field} isInvalid={!!errors.team_id} onChange={(e) => {
                  field.onChange(e); // This is necessary to ensure the form state is updated
                  const selectedTeam = teamOptions.find(team => team.value === e.target.value);
                  setSelectedTeam(selectedTeam);
                }}>
                  <option value="">Select a Team</option>
                  {teamOptions.map((team) => (
                    <option key={team.value} value={team.value}>{team.label}</option>
                  ))}
                </Form.Select>
              )}
            />

            {errors.team_id && (
              <Form.Control.Feedback type="invalid">
                {errors.team_id.message}
              </Form.Control.Feedback>
            )}
          </Form.Group>


          {/* Username */}
          <Form.Group className="mb-3">
            <Form.Label>Username *</Form.Label>
            <Form.Control
              type="text"
              {...register("user_name", { required: "Username is required", pattern: { value: usernamePattern, message: "Invalid username format" } })}
              isInvalid={errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Logo URL */}
          <Form.Group className="mb-3">
            <Form.Label>Logo URL</Form.Label>
            <Form.Control
              type="text"
              {...register("logo_url")}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            {isCreate ? "Create" : "Save"}
          </Button>
        </Form>
      </div>
    </Container>
  );
}

export default EditPlayer;
