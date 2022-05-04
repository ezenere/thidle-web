export function HomeTown(props){
    return `${props.city ? (props.city+', ') : ''}${props.country ? (props.country) : ''}`;
}