import {GitHubCalendar} from 'react-github-calendar';



export default function GithubContribution(){
    return(
        <div className='flex flex-col items-center p4 mt-5'>
            <GitHubCalendar
             username='francapaa'
             year={new Date().getFullYear()}
             colorScheme='light'
            />
        </div>
    )
}