import {
  Typography,
  Box,
  TextField,
  List,
  ListItemButton,
  ListItemText,
  ListItem,
} from "@mui/material";

import { FlexBox } from "../../../layouts/flexBox";
import { investmentItems } from "../../../data/dummy";

function Item() {
  return (
    // Page Component
    <FlexBox
      csx={{
        gridColumn: { xs: "1 / 2", md: "2 / 3" },
        gridRow: "2 / 3",
        overflowX: "scroll",
      }}
    >
      {/* Main Content */}
      <Box sx={{ maxWidth: "530px", width: "100%", height: "auto" }}>
        {/* Header */}
        <Box mb={3}>
          <Typography variant="h5" textAlign={"center"}>
            Investment Items
          </Typography>
        </Box>
        {/* Search Field */}
        <TextField
          label={"Search"}
          name={"itemName"}
          fullWidth
          id={"itemName"}
          size={"small"}
          onChange={null}
          error={null}
          sx={{ mb: 3 }}
        />
        {/* Body */}
        <List sx={{ width: "100%", height: "500px", overflowY: "auto" }}>
          {investmentItems.map((investmentItem) => (
            <ListItem key={investmentItem.name} disablePadding>
              <ListItemButton>
                <ListItemText primary={investmentItem.name} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </FlexBox>
  );
}

export default Item;
