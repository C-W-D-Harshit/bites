import Link from "next/link";
import { FaUtensils } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { MdAccountBox } from "react-icons/md";
import { GiHamburgerMenu } from "react-icons/gi";
import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { createTheme } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const theme = createTheme({
    typography: {
      // Tell MUI what's the font-size on the html element is.
      htmlFontSize: 8,
    },
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <ThemeProvider theme={theme}>
      <Box
        sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
        role="presentation"
        onClick={toggleDrawer(anchor, false)}
        onKeyDown={toggleDrawer(anchor, false)}
      >
        <List>
          {["About", "Shop", "Reviews", "Blog", "Contact"].map(
            (text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText style={{ fontSize: "3rem" }} primary={text} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
        <Divider />
        <List>
          {["All mail", "Trash", "Spam"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </ThemeProvider>
  );
  return (
    <div className="header">
      <div className="header__logo" onClick={() => router.push("/")}>
        <div className="header__logo_">
          <FaUtensils />
        </div>
        <p>Bites</p>
      </div>
      <div className="header__menu">
        <Link href="/" className="header__menu_">
          <div>
            <p>AboutUs</p>
          </div>
        </Link>
        <Link href="/shop" className="header__menu_">
          <div>
            <p>Shop</p>
          </div>
        </Link>
        <Link href="/" className="header__menu_">
          <div>
            <p>Reviews</p>
          </div>
        </Link>
        <Link href="/" className="header__menu_">
          <div>
            <p>Blog</p>
          </div>
        </Link>
        <Link href="/" className="header__menu_">
          <div>
            <p>Contact</p>
          </div>
        </Link>
      </div>
      <div className="header__ctas">
        <Link href="/cart" className="header__cta">
          <div>
            <TiShoppingCart />
          </div>
        </Link>
        <Link href="/cart" className="header__cta">
          <div>
            <MdAccountBox />
          </div>
        </Link>
      </div>
      <div className="header__mob">
        <React.Fragment key={"right"}>
          <Button onClick={toggleDrawer("right", true)}>
            <GiHamburgerMenu
              style={{
                fontSize: "3rem",
                color: "black",
              }}
            />
          </Button>
          <Drawer
            anchor={"right"}
            open={state["right"]}
            onClose={toggleDrawer("right", false)}
          >
            {list("right")}
          </Drawer>
        </React.Fragment>
      </div>
    </div>
  );
};

export default Header;
