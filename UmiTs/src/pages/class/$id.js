import {
    Component
} from 'react'

export default class Id extends Component {

    constructor(props) {
        super(props)

    }
    componentDidCatch(){
    }
    render() {
        const params  = useParams();
        console.log(params);

        return (
            <h1>id</h1>
        )
    }
}