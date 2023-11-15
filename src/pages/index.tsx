import { useForm, SubmitHandler } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import React from "react";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { useRouter } from "next/navigation";

type Inputs = {
  username: string;
  password: string;
};

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export default function Home() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const response = await fetch("/api/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    await response
      .json()
      .then((da) => {
        alert(da?.message);
      })
      .catch((err) => {
        (async () => {
          await fetch("/api/clearcookie");
        })();
        alert(err?.message || "Error");
      });
    switch (true) {
      case response.status >= 400 && response.status <= 599:
        (async () => {
          await fetch("/api/clearcookie");
        })();
        return;
      case response.status === 200:
        router.push("/list");
      default:
        return;
    }
  };

  return (
    /* "handleSubmit" will validate your inputs before invoking "onSubmit" */
    <form id="sampleForm" onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Item>
            <FormControl error={!!errors.username} variant="standard">
              <InputLabel htmlFor="component-name">Name</InputLabel>
              <Input
                {...register("username", { required: "Name is required" })}
                id="component-name"
                defaultValue=""
              />
              {errors.username && (
                <FormHelperText id="component-name-error-text">
                  {`${errors.username.message}`}
                </FormHelperText>
              )}
            </FormControl>
          </Item>
        </Grid>
        <Grid item xs={6}>
          <Item>
            <FormControl error={!!errors.password} variant="standard">
              <InputLabel htmlFor="component-name">Password</InputLabel>
              <Input
                {...register("password", { required: "Password is required" })}
                id="component-name"
                defaultValue=""
              />
              {errors.password && (
                <FormHelperText id="component-name-error-text">
                  {`${errors.password.message}`}
                </FormHelperText>
              )}
            </FormControl>
          </Item>
        </Grid>
        <Grid item xs={12}>
          <Item>
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              Submit
            </Button>
          </Item>
        </Grid>
      </Grid>
    </form>
  );
}
