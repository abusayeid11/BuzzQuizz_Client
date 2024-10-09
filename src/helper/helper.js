import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

export function attempts_Number(result) {
    return result.filter((r) => r !== undefined).length;
}
export function earn_points(result, answers) {
    return result
        .map((selectedOption, i) =>
            answers[i].CorrectOptions.includes(selectedOption)
        )
        .filter((isCorrect) => isCorrect)
        .map(() => 10)
        .reduce((prev, curr) => prev + curr, 0);
}
export function flag_result(totalpoints, earnPoints) {
    return (totalpoints * 50) / 100 < earnPoints;
}
/** check user auth  */
export function CheckUserExist({ children }) {
    const auth = useSelector((state) => state.user.userId);
    return auth ? children : <Navigate to={'/login'} replace={true}></Navigate>;
}
export function CheckUserAdmin({ children }) {
    const auth = useSelector((state) => state.user.userRole);

    return auth === 'admin' ? (
        children
    ) : (
        <Navigate to={'/'} replace={true}></Navigate>
    );
}
export function CheckUserTeacher({ children }) {
    const auth = useSelector((state) => state.user.userRole);
    return auth === 'teacher' ? (
        children
    ) : (
        <Navigate to={'/'} replace={true}></Navigate>
    );
}
export function CheckUserStudent({ children }) {
    const auth = useSelector((state) => state.user.userRole);
    return auth === 'student' ? (
        children
    ) : (
        <Navigate to={'/'} replace={true}></Navigate>
    );
}
