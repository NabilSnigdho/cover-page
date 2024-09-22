import RUETLogo from '@/assets/RUET-Logo.png';
import MonotypeCorsiva from '@/assets/fonts/Monotype-Corsiva-Regular.ttf';
import TeXGyreTermesBold from '@/assets/fonts/TeXGyreTermes-Bold.ttf';
import TeXGyreTermes from '@/assets/fonts/TeXGyreTermes-Regular.ttf';
import atoms, { departmentAtom, typeAtom } from '@/store/editor';
import {
  Document,
  Font,
  Image,
  Page,
  StyleSheet,
  Text,
  View,
} from '@react-pdf/renderer';
import { useAtomValue } from 'jotai';

Font.register({
  family: 'Monotype Corsiva',
  src: MonotypeCorsiva,
});

Font.register({
  family: 'TeX Gyre Termes',
  fonts: [{ src: TeXGyreTermes }, { src: TeXGyreTermesBold, fontWeight: 700 }],
});

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#FFFFFF',
    gap: 16,
    padding: '2.54cm',
    paddingLeft: '3cm',
    fontFamily: 'TeX Gyre Termes',
    textAlign: 'center',
  },
  motto: {
    fontSize: 12,
    fontFamily: 'Monotype Corsiva',
    color: '#333333',
  },
  institution: {
    fontSize: 17,
    marginVertical: 16,
  },
  image: {
    marginVertical: 0,
    marginHorizontal: 'auto',
    height: 104,
    width: 90,
  },
  text: {
    fontSize: 16,
  },
  textBF: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 700,
  },
  course: {
    marginVertical: 16,
    flexDirection: 'column',
  },
  thV: {
    fontSize: 16,
    textAlign: 'left',
    flexGrow: 0,
    flexShrink: 0,
    flexBasis: 120,
    fontWeight: 700,
  },
  thH: {
    fontSize: 16,
    textAlign: 'left',
    fontWeight: 700,
    textDecoration: 'underline',
  },
  colon: {
    fontSize: 16,
    fontWeight: 700,
    flexBasis: 16,
    textAlign: 'center',
  },
  td: {
    fontSize: 16,
    textAlign: 'left',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
});

// Create Document Component
export function CoverTemplate() {
  const department = useAtomValue(departmentAtom);
  const type = useAtomValue(typeAtom);
  const courseNo = useAtomValue(atoms.courseNoAtom);
  const courseTitle = useAtomValue(atoms.courseTitleAtom);
  const coverNo = useAtomValue(atoms.coverNoAtom);
  const coverTitle = useAtomValue(atoms.coverTitleAtom);
  const studentSection = useAtomValue(atoms.studentSection);
  const teacherDepartment = useAtomValue(atoms.teacherDepartment);
  const dateOfSubmission = useAtomValue(atoms.dateOfSubmission);

  return (
    <Document title="Cover Page">
      <Page size="A4" style={styles.page}>
        <Text style={styles.motto}>Heaven’s Light is Our Guide</Text>
        <Text style={styles.institution}>
          Rajshahi University of Engineering & Technology, Bangladesh
        </Text>
        <Image src={RUETLogo} style={styles.image} />
        <Text style={styles.text}>Department of {department}</Text>
        <View style={styles.course}>
          <Text style={styles.text}>Course No.: {courseNo}</Text>
          <Text style={styles.text}>Course Title: {courseTitle}</Text>
        </View>
        <View>
          {!!coverNo && (
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.thV}>
                {type === 'Assignment' ? type : 'Experiment'} No.
              </Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.td}>
                {coverNo === '0' ? '' : coverNo.padStart(2, '0')}
              </Text>
            </View>
          )}
          <View style={{ flexDirection: 'row' }}>
            <Text style={styles.thV}>
              {type === 'Assignment' ? type : 'Experiment'} Title
            </Text>
            <Text style={styles.colon}>:</Text>
            <Text style={styles.td}>{coverTitle}</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginVertical: 16,
            gap: 32,
            textAlign: 'left',
          }}
        >
          <View style={{ flex: '1 1 0' }}>
            <Text style={styles.thH}>Submitted by:</Text>
            <Text style={styles.text}>{useAtomValue(atoms.studentName)}</Text>
            <Text style={styles.text}>
              Roll: {useAtomValue(atoms.studentID)}
            </Text>
            {!!studentSection && (
              <Text style={styles.text}>Section: {studentSection}</Text>
            )}
          </View>
          <View style={{ flex: '1 1 0' }}>
            <Text style={styles.thH}>Submitted to:</Text>
            <Text style={styles.text}>{useAtomValue(atoms.teacherName)}</Text>
            <Text style={styles.text}>
              {useAtomValue(atoms.teacherDesignation)}
            </Text>
            {!!teacherDepartment && (
              <Text style={styles.text}>
                Dept. of {teacherDepartment}, RUET
              </Text>
            )}
          </View>
        </View>
        <View
          style={{ marginTop: 'auto', textAlign: 'left', flexDirection: 'row' }}
        >
          {!!dateOfSubmission && (
            <>
              <Text style={styles.textBF}>Date of Submission</Text>
              <Text style={styles.colon}>:</Text>
              <Text style={styles.text}>{dateOfSubmission}</Text>
            </>
          )}
        </View>
      </Page>
    </Document>
  );
}
