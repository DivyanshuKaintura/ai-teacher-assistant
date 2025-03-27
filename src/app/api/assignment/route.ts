// lib/assignmentApi.ts
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { storage, db } from '../../../lib/firebase';

export interface AssignmentDetails {
  title: string;
  description: string;
  dueDate: string;
  classCode: string;
  teacherName: string;
  subject: string;
  subjectCode: string;
  fileURL?: string;
  semester: string;
  course: string;
}

export const uploadPdfToStorage = async (file: File): Promise<string> => {
  if (!file) {
    throw new Error('No file provided');
  }

  try {
    // Validate file type
    if (file.type !== 'application/pdf') {
      throw new Error('Only PDF files are allowed');
    }

    // Check file size (optional, e.g., limit to 10MB)
    if (file.size > 10 * 1024 * 1024) {
      throw new Error('File size exceeds 10MB limit');
    }

    const storageRef = ref(storage, `assignments/${Date.now()}_${file.name}`);
    
    // Upload with detailed logging
    console.log('Uploading file:', file.name);
    const snapshot = await uploadBytes(storageRef, file);
    
    const downloadURL = await getDownloadURL(snapshot.ref);
    console.log('File uploaded successfully:', downloadURL);
    
    return downloadURL;
  } catch (error) {
    console.error('PDF Upload Error:', error);
    throw error;
  }
};

export const saveAssignmentToFirestore = async (assignmentDetails: AssignmentDetails): Promise<string> => {
  try {
    // Validate input
    if (!assignmentDetails.fileURL) {
      throw new Error('File URL is required');
    }

    const assignmentData = {
      ...assignmentDetails,
      uploadedAt: serverTimestamp(), // Use server timestamp
      createdAt: new Date().toISOString()
    };

    // Log assignment data before saving
    console.log('Saving Assignment:', assignmentData);

    const docRef = await addDoc(collection(db, 'assignments'), assignmentData);

    // storing class code in a separate collection
    // await addDoc(collection(db, 'course-semester'), { course: assignmentDetails.course, semester: assignmentDetails.semester});
    
    console.log('Assignment saved with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error('Firestore Save Error:', error);
    throw error;
  }
};