import { useState } from "react";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";
import ListAltIcon from "@mui/icons-material/ListAlt";
import HistoryIcon from "@mui/icons-material/History";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PaidIcon from "@mui/icons-material/Paid";
import ReceiptIcon from "@mui/icons-material/Receipt";

function Nav() {
  const [isSubNavOpen, setIsSubNavOpen] = useState({
    trans: false,
    sales: false,
  });

  function handleSubNav(name) {
    setIsSubNavOpen({ ...isSubNavOpen, [name]: !isSubNavOpen[name] });
  }

  return (
    <List component={"nav"} aria-label="main navigation">
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>

      <ListItemButton onClick={() => handleSubNav("trans")}>
        <ListItemIcon>
          <PaidIcon />
        </ListItemIcon>
        <ListItemText primary="Investment" />

        {isSubNavOpen.trans ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>

      <Collapse in={isSubNavOpen.trans} timeout="auto" unmountOnExit>
        <List component={"div"} disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Items" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Add" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton onClick={() => handleSubNav("sales")}>
        <ListItemIcon>
          <ReceiptIcon />
        </ListItemIcon>
        <ListItemText primary="Sale" />

        {isSubNavOpen.sales ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItemButton>

      <Collapse in={isSubNavOpen.sales} timeout="auto" unmountOnExit>
        <List component={"div"} disablePadding>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <ListAltIcon />
            </ListItemIcon>
            <ListItemText primary="Products" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <HistoryIcon />
            </ListItemIcon>
            <ListItemText primary="History" />
          </ListItemButton>

          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <AddCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Add" />
          </ListItemButton>
        </List>
      </Collapse>
    </List>
  );
}

export default Nav;
