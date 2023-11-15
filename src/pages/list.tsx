import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";

export default function List() {
  const [data, setData] = React.useState([]);
  const router = useRouter();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/list", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const da = await response.json();
        alert(da?.message);
        if (response.status >= 400 && response.status <= 599) {
          await fetch("/api/clearcookie");
          router.push("/");
          return;
        }
        setData(da?.data);
      } catch (err: any) {
        await fetch("/api/clearcookie");
        router.push("/");
        alert(err?.message || "Error");
      }
    };

    fetchData(); // Call the function directly
  }, [router]); // Add dependencies to the dependency array

  const handleLogout = async () => {
    await fetch("/api/clearcookie");
    router.push("/");
    alert("Logged out");
  };

  return (
    <>
      {Array.isArray(data) &&
        !!data?.length &&
        data?.map((item: any) => (
          <Card key={item.id} sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={item.image}
                alt={item.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      <Button onClick={handleLogout} variant="contained" endIcon={<SendIcon />}>
        Logout
      </Button>
    </>
  );
}
