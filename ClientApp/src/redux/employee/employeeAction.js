import  { CREATE_USERS_FAILURE, CREATE_USERS_SUCCESS,UPLOAD_FILE_SUCCESS,UPLOAD_FILE_FAILURE, FETCH_EMPLOYEE_SUCCESS,
    Authenticate_Employee_Success,Authenticate_Employee_Failure, 
   } from "./employeeActionTypes"

export const createEmployeeSuccess= error => {
    return {
        type : CREATE_EMPLOYEE_SUCCESS ,
        payload : error
    }
}

export const createEmployeeFailure = error => {
    return {
        type : CREATE_EMPLOYEE_FAILURE,
        payload : error
    }
}
export const uploadFileSuccess = error => {
    return {
        type : UPLOAD_FILE_SUCCESS,
        payload : error
    }
}
export const uploadFileFailure = error => {
    return {
        type : UPLOAD_FILE_FAILURE,
        payload : error
    }
}


export const uploadFile = async (file, fileName) => {
    return async (dispatch) => {
        console.log(file);
        const formData = new FormData();
        formData.append("formFile", file);
        formData.append("formName", fileName);
        try {
            const res = await genericCall("candidate/UploadResume/", formData, 'post');
            console.log(res);
            if(res && (res.status == 201)){
                setUploadStatus('success')
                dispatch(uploadFileSuccess)
            }
            else{
                dispatch(uploadFileFailure(res.error))
            }
        }
        catch(ex){
            console.log(ex);
            alert(ex);
        }
    }
 }