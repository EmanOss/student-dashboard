import * as React from 'react';
import { Theme, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { Course } from '../types/Course';
import { TranslationProps } from '../types/TranslationProps';
import { withTranslation } from 'react-i18next';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function MultipleSelectChip({ courseList, setCourseList, t}: { courseList: string[], setCourseList: React.Dispatch<React.SetStateAction<string[]>>, t: TranslationProps['t']}) {
  const theme = useTheme();
  const [allCourses, setAllCourses] = React.useState<Course[]>([]);
  // const [courseListTitles, setCourseListTitles] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof courseList>) => {
    const {
      target: { value },
    } = event;
    setCourseList(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  React.useEffect(() => {
    const fetchCourses = async () => {
      const response = await fetch(`/api/courses/`, { credentials: 'include', });
      const json = await response.json();
      if (response.ok) {
        setAllCourses(json);
      }
    }
    fetchCourses();
  }, []);
  // React.useEffect(() => {
  //   // const filteredCourses = allCourses.filter(course => courseList.includes(course._id));
  //   // const courseTitles = filteredCourses.map(course => course.title);
  //   // setCourseListTitles(courseTitles);
  //   // console.log(courseTitles, courseListTitles, filteredCourses);

  //   const updatedTitles = courseList.map(courseId => {
  //     const course = allCourses.find(c => c._id === courseId);
  //     // if(course)
  //     return course ? course.title : '';
  //   });
  //   setCourseListTitles(updatedTitles);
  //   // let updatedTitles:string[] = []
  //   // courseList.map(courseId => {
  //   //   const course = allCourses.find(c => c._id === courseId);
  //   //   if(course)
  //   //   updatedTitles.push(course.title) ;
  //   // });
  //   // setCourseListTitles(updatedTitles);
  //   console.log(courseList, updatedTitles, courseListTitles);
  // }, [courseList]);


  return (
    <div>
      <FormControl sx={{ width: '100%' }}>
        <InputLabel id="demo-multiple-chip-label">{t("Courses")}</InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={courseList}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={t("Courses")} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {allCourses.map((course) => (
            <MenuItem
              key={course._id}
              value={course._id}
              style={getStyles(course.title, courseList, theme)}
            >
              {course.title}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}

export default withTranslation()(MultipleSelectChip);