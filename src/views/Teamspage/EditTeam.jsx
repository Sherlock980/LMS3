import React, { useState, useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { TeamsContext } from '../../services/TeamsContext';
import { Container, Form, Button } from 'react-bootstrap';

function EditTeam({ isCreate }) {
    const { api } = useContext(TeamsContext);
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, setValue, formState: { errors } } = useForm();
    const [coachOptions, setCoachOptions] = useState([]);

    useEffect(() => {
        api.getLookup('coaches')
          .then(options => {
            console.log("Fetched coach options:", options);
            setCoachOptions(options);
          })
          .catch(error => console.error("Failed to fetch coaches", error));
      
      if (!isCreate) {
        api.read(id)
          .then(team => {
            console.log("Fetched team data for editing:", team);
            if (team) {
              Object.keys(team).forEach(key => {
                setValue(key, team[key]);
              });
            }
          })
          .catch(error => console.error("Failed to fetch team data", error));
      }
    }, [api, id, isCreate, setValue]);
    const onSubmit = data => {
        console.log("Form submission data:", data);

        const coachName = coachOptions.find(option => String(option.value) === String(data.coach_id))?.label;

        console.log("Resolved Coach Name:", coachName);
        const submissionData = { ...data, coachName };
        console.log("Submission data with coachName:", submissionData);
      
        const action = isCreate ? api.create : api.update;
        action(submissionData)
            .then(() => navigate("/teams"))
            .catch(error => console.error("Failed to save team", error));
      };
      
    

    return (
      <Container>
        <h1>{isCreate ? "Add Team" : "Edit Team"}</h1>
        <Form noValidate onSubmit={handleSubmit(onSubmit)}>
          {/* Team Name Field */}
          <Form.Group className="mb-3">
            <Form.Label>Team Name</Form.Label>
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
            <Form.Label>Coach</Form.Label>
            <Form.Select {...register("coach_id", { required: "Coach is required" })}>
              <option value="">Select a Coach</option>
              {coachOptions.map(option => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
              {errors.coach_id?.message}
            </Form.Control.Feedback>
          </Form.Group>
  
          {/* Notes Field */}
          <Form.Group className="mb-3">
            <Form.Label>Notes</Form.Label>
            <Form.Control as="textarea" {...register("notes")} />
          </Form.Group>
  
          {/* Motto Field */}
          <Form.Group className="mb-3">
            <Form.Label>Motto</Form.Label>
            <Form.Control type="text" {...register("motto")} />
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
      </Container>
    );
  }

export default EditTeam;


