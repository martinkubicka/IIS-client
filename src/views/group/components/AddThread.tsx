import AddIcon from "@mui/icons-material/Add";
import { Button, FormControl, Input, Stack, Textarea, FormLabel } from "@mui/joy";
import Accordion from "@mui/joy/Accordion";
import AccordionDetails from "@mui/joy/AccordionDetails";
import AccordionGroup from "@mui/joy/AccordionGroup";
import AccordionSummary, {
  accordionSummaryClasses,
} from "@mui/joy/AccordionSummary";
import { CssVarsProvider as JoyCssVarsProvider } from "@mui/joy/styles";
import { Box, FormHelperText, TextField } from "@mui/material";
import {
  THEME_ID as MATERIAL_THEME_ID,
  Experimental_CssVarsProvider as MaterialCssVarsProvider,
  experimental_extendTheme as materialExtendTheme,
} from "@mui/material/styles";
import { useEffect, useState } from "react";

const materialTheme = materialExtendTheme();

export default function AddThreadDropDown({
    onSubmit,
    thread
}) {

    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [validName, setValidName] = useState<boolean>(true);
    const [validDescription, setValidDescription] = useState<boolean>(true);
  
    useEffect(() => {
      if (thread !== undefined && thread !== null) {
        setDescription(thread.description);
        setName(thread.name);
      }
    }, [thread]);
  
    useEffect(() => {
      handleFieldChange();
    }, [name, description]);
  
    const handleFieldChange = () => {
      if (name?.trim() === "") {
        setValidName(false);
      } else {
        setValidName(true);
      }
  
      if (description !== "" && description?.trim() === "") {
        setValidDescription(false);
      } else {
        setValidDescription(true);
      }
    };

  return (
    <div>
      <MaterialCssVarsProvider theme={{ [MATERIAL_THEME_ID]: materialTheme }}>
        <JoyCssVarsProvider>
          <AccordionGroup
            sx={{
              [`& .${accordionSummaryClasses.indicator}`]: {
                transition: "0.2s",
              },
              [`& [aria-expanded="true"] .${accordionSummaryClasses.indicator}`]:
                {
                  transform: "rotate(45deg)",
                },
              paddingTop: "30px",
              paddingBottom: "10px",
            }}
          >
            <Accordion>
              <AccordionSummary indicator={<AddIcon />}>
                Add thread
              </AccordionSummary>
              <AccordionDetails>
                    <form
                        onSubmit={(event) => {
                            event.preventDefault();
                            const result = onSubmit({ name, description });
                            if (result) {
                                setName("");
                                setDescription("");
                            }
                        }}
                        >
                            <div
                            style={{
                                display: "flex",
                                flexDirection: "row",
                                alignItems: "center",
                                flexWrap: "wrap",
                            }}
                            >
                            <FormControl error={!validName} sx={{paddingRight: "20px"}}>
                                <FormLabel>Name</FormLabel>
                                <Input
                                    autoFocus
                                    required
                                    value={name}
                                    onChange={(e) => {
                                    e.target.value = e.target.value.slice(0, 50);
                                    setName(e.target.value);
                                    }}
                                    error={!validName}
                                />
                                {!validName ? (
                                    <FormHelperText error={!validName}>Name field cannot be empty!</FormHelperText>
                                ) : 
                                (<FormHelperText> </FormHelperText>)}
                            </FormControl>

                            <FormControl error={!validDescription} sx={{paddingRight: "20px"}}>      
                                <FormLabel>Description</FormLabel>           
                                <Textarea
                                    minRows={1}
                                    value={description}
                                    onChange={(e) => {
                                    e.target.value = e.target.value.slice(0, 100);
                                    setDescription(e.target.value);
                                    }}
                                    error={!validDescription}
                                />
                                {!validDescription ? (
                                    <FormHelperText error={!validDescription}>
                                    Description cannot contains only whitespaces!
                                    </FormHelperText>
                                ) : 
                                (<FormHelperText> </FormHelperText>)}
                            </FormControl>
                            
                            <Box sx={{ display: "flex", justifyContent: "center", gap: 3 }}>
                            <Button
                                size="lg"
                                type="submit"
                                disabled={!validName || !validDescription}
                            >
                                Create
                            </Button>
                            </Box>
                            </div>
               
                    </form>
              </AccordionDetails>
            </Accordion>
          </AccordionGroup>
        </JoyCssVarsProvider>
      </MaterialCssVarsProvider>
    </div>
  );
};
