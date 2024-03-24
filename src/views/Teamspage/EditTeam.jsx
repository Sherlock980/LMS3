import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { TeamsContext } from '../../services/contexts';
import { Container, Form, Button } from 'react-bootstrap';
import { Controller } from 'react-hook-form';

function EditTeam({ isCreate }) {
  const { api } = useContext(TeamsContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, control, setValue, formState: { errors }, setError, clearErrors }  = useForm();
    
    const [coachOptions, setCoachOptions] = useState([]);
    const isTeamNameUnique = async (newName, currentTeamId) => {
      const allTeams = await api.list();
      return !allTeams.some(team => team.name === newName && team.id !== currentTeamId);
    };
    useEffect(() => {
        api.getLookup('coaches')
          .then(options => {
            setCoachOptions(options);
          })
          .catch(error => console.error("Failed to fetch coaches", error));
      
      if (!isCreate) {
        api.read(id)
          .then(team => {
            if (team) {
              Object.keys(team).forEach(key => {
                setValue(key, team[key]);
              });
              setValue("coach_id", team.coach_id.toString());
            }
          })
          .catch(error => console.error("Failed to fetch team data", error));
      }
    }, [api, id, isCreate, setValue]);

    const onSubmit = async (data) => {
      const isNewTeam = isCreate;
      const currentTeamId = isNewTeam ? null : Number(id);
      
      const unique = await isTeamNameUnique(data.name, currentTeamId);
      if (!unique) {
        setError("name", {
          type: "manual",
          message: "Team name already exists. Please choose a different name.",
        });
        return;
      } else {
        clearErrors("name");
      }
    
      const coachName = coachOptions.find(option => String(option.value) === String(data.coach_id))?.label;
      const submissionData = { ...data, id: currentTeamId, coachName };
      
      try {
        if (isNewTeam) {
          await api.create(submissionData);
        } else {
          await api.update(submissionData);
        }
        navigate("/teams");
      } catch (error) {
        console.error("Failed to save team", error);
      }
    };
    
    
    return (
      <Container>
        <div className='edit-form'>
          <h1>{isCreate ? "Add Team" : "Edit Team"}</h1>
          <h6>Required Feilds *</h6>
          <Form noValidate onSubmit={handleSubmit(onSubmit)}>
            {/* Team Name Field */}
            <Form.Group className="mb-3">
              <Form.Label>Team Name *</Form.Label>
              <Form.Control
                type="text"
                {...register("name", { required: "Team name is required" })}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name?.message}
              </Form.Control.Feedback>
            </Form.Group>

            {/* Coach Dropdown */}
            <Form.Group className="mb-3">
              <Form.Label>Coach *</Form.Label>
              <Controller
                name="coach_id"
                control={control}
                rules={{ required: "Coach is required" }}
                render={({ field }) => (
                  <Form.Select {...field} isInvalid={!!errors.coach_id}>
                    <option value="">Select a Coach</option>
                    {coachOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </Form.Select>
                )}
              />
              {errors.coach_id && (
                <Form.Control.Feedback type="invalid">
                  {errors.coach_id.message}
                </Form.Control.Feedback>
              )}
            </Form.Group>
    
            {/* Motto Field */}
            <Form.Group className="mb-3">
              <Form.Label>Motto</Form.Label>
              <Form.Control type="text" {...register("motto")} />
            </Form.Group>

            {/* Notes Field */}
            <Form.Group className="mb-3">
                <Form.Label>Notes</Form.Label>
                <Form.Control 
                    as="textarea" 
                    {...register("notes")} 
                    placeholder="Enter any additional notes here" 
                />
            </Form.Group>

            {/* Logo URL Field */}
            <Form.Group className="mb-3">
              <Form.Label>Logo URL</Form.Label>
              <Form.Control type="text" {...register("logo_url")} />
            </Form.Group>
    
            <Button variant="primary" type="submit">
              {isCreate ? "Create" : "Save"}
            </Button>
          </Form>
        </div>
      </Container>
    );
  }

export default EditTeam;


