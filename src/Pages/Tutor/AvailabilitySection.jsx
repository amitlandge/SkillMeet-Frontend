import React from "react";
import { Controller } from "react-hook-form";
import {
  Select,
  MenuItem,
  Checkbox,
  ListItemText,
  InputLabel,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import days from "../../Features/days";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { TextField, Typography, Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 5 + ITEM_PADDING_TOP, // shows 5 items, rest scrollable
      width: 250,
    },
  },
};

const AvailabilitySection = ({ control, label }) => {
  return (
    <FormControl fullWidth>
      <InputLabel>{label}</InputLabel>
      <Controller
        name={"availabilityDays"}
        control={control}
        defaultValue={[]}
        render={({ field }) => (
          <Select
            {...field}
            multiple
            input={<OutlinedInput label={label} />}
            renderValue={(selected) => selected.join(", ")}
            MenuProps={MenuProps}
          >
            {days.map((option) => (
              <MenuItem key={option} value={option}>
                <Checkbox checked={field.value.indexOf(option) > -1} />
                <ListItemText primary={option} />
              </MenuItem>
            ))}
          </Select>
        )}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Grid container spacing={2} sx={{ mt: 2 }}>
          <Grid item xs={6}>
            <Controller
              name="availabilityStart"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <TimePicker
                  label="Start Time"
                  value={field.value}
                  onChange={(newValue) => field.onChange(newValue)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              )}
            />
          </Grid>
          <Grid item xs={6}>
            <Controller
              name="availabilityEnd"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <TimePicker
                  label="End Time"
                  value={field.value}
                  onChange={(newValue) => field.onChange(newValue)}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              )}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
    </FormControl>
  );
};

export default AvailabilitySection;
