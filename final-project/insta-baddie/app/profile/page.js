import Nav from '../nav';
import '../globals.css';
import './profile.css';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import { useClient } from '@/utils/supabase/client';

export default function Home() {
  useClient();

  const [fullname, setFullname] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    const supabase = createClient();
    const user = supabase.auth.user();
    if (user) {
      supabase
        .from('profiles')
        .select(`full_name, username, bio`)
        .eq('id', user.id)
        .then(({ data, error }) => {
          if (error) {
            console.error('Error loading user data:', error.message);
          } else if (data) {
            setFullname(data.full_name);
            setUsername(data.username);
            setBio(data.bio);
          }
        })
        .catch(error => {
          console.error('Error loading user data:', error.message);
        });
    }
  }, []);

  return (
      <main>
        <Nav/> 
        <div className="container">
          <div className="profile-section">
            <div className="profile-header">
              <img src="https://picsum.photos/200/300" alt="Random Image" className="profile-picture" />
              <h1 className="profile-name">{fullname}</h1>
              <p className="profile-username">@{username}</p>
              <p className="profile-bio">{bio}</p>
            </div>
        
            <div className="profile-stats">
              <div>
                <h2>Tweets</h2>
                <p>100</p>
              </div>
              <div>
                <h2>Following</h2>
                <p>50</p>
              </div>
              <div>
                <h2>Followers</h2>
                <p>200</p>
              </div>
            </div>

            <div className="profile-timeline">
        {/* Replace with actual tweets */}
              <div className="tweet">
                <p>This is a tweet!</p>
                <p className="tweet-date">1 hour ago</p>
              </div>
              <div className="tweet">
                <p>Another tweet here.</p>
                <p className="tweet-date">2 hours ago</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }