import { useState } from "react";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useRouter } from "next/navigation";
import { db } from "../utils/fireStore";
import Loader from "../components/loader";

const defaultTheme = createTheme();

export default function SignUp() {
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  let dat = {
    email: "",
    firstName: "",
    lastName: "",
    mobileNo: "",
    password: "",
  };
  const [state, setState] = useState(dat);
  const router = useRouter();

  function clear() {
    setState(dat);
    setConfirmPass("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(state.email);

    if (!isEmailValid) {
      alert("Enter Valid email Address.");
      setDisabled(false);
      setLoading(false);
      return;
    }

    if (state.password !== confirmPass) {
      alert("Password Mismatch");
      setDisabled(false); 
      setLoading(false);
      return;
    }

    if (state.mobileNo.length !== 10) {
      alert("Please Enter 10 digit mobile No.");
      setDisabled(false);
      setLoading(false);
      return;
    }
    
    setDisabled(true);

    const emailSnapShotPromise = getDocs(query(collection(db, "users"), where('email', "==", state.email)));

    const phoneNumberSnapShotPromise = getDocs(query(collection(db, "users"), where('mobileNo', "==", state.mobileNo)));

    const [emailSnapShot, phoneNumberSnapShot] = await Promise.all([emailSnapShotPromise, phoneNumberSnapShotPromise]);

    if(emailSnapShot && emailSnapShot.docs.length > 0){
      alert("User With Email Address Already Exists");
      setDisabled(false);
      setLoading(false);
      return;
    }

    if(phoneNumberSnapShot && phoneNumberSnapShot.docs.length > 0){
      alert("User With Phone Number Already Exists");
      setDisabled(false);
      setLoading(false);
      return;
    }

    await addDoc(collection(db, "users"), state);

    clear();

    setLoading(false);

    setDisabled(false);

    router.replace("/");
  };

  const [confirmPass, setConfirmPass] = useState("");

  const Inputchange = (event) => {
    const { name, value } = event.target;
    if (name === "mobileNo") {
      if (value.length <= 10) {
        setState({
          ...state,
          [name]: value,
        });
      }
    } else {
      setState({
        ...state,
        [name]: value,
      });
    }
  };
  const handleKeyDown = (event) => {
    if (
      !/^[0-9\b]+$/.test(event.key) &&
      event.key !== "Backspace" &&
      event.key !== "Tab" &&
      event.key !== "Enter"
    ) {
      event.preventDefault();
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        {loading && <Loader />}
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: "20px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>

          <Box component="form" onSubmit={handleSubmit} data-testid="signup-form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={state.firstName}
                  onChange={Inputchange}
                  autoFocus
                  data-testid="first-name-input"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  value={state.lastName}
                  onChange={Inputchange}
                  name="lastName"
                  autoComplete="family-name"
                  data-testid="last-name-input"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  value={state.email}
                  onChange={Inputchange}
                  name="email"
                  autoComplete="email"
                  data-testid="email-address-input"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  value={state.password}
                  onChange={Inputchange}
                  id="password"
                  autoComplete="new-password"
                  data-testid="password-input"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirm Password"
                  type="password"
                  value={confirmPass}
                  onChange={(e) => setConfirmPass(e.target.value)}
                  id="confirmPassword"
                  autoComplete="confirm-password"
                  data-testid="confirm-password-input"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="mobileNo"
                  label="10 digit Mobile No."
                  type="text"
                  value={state.mobileNo}
                  onChange={Inputchange}
                  id="mobileNo"
                  autoComplete="mobile"
                  onKeyDown={handleKeyDown}
                  data-testid="mobile-number-input"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              disabled={disabled}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
