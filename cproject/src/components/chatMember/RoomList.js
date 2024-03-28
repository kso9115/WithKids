import React, { useState, useEffect } from 'react';

function RoomList() {
    const [rooms, setRooms] = useState([]);
    const [roomName, setRoomName] = useState(null);

    useEffect(() => {
        const fetchRooms = async () => {
            try {
                const response = await fetch('/api/rooms'); // Assuming API endpoint for fetching rooms
                const data = await response.json();
                setRooms(data);
            } catch (error) {
                console.error('Error fetching rooms:', error);
            }
        };
        fetchRooms();
    }, []);

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const name = formData.get('name');
        try {
            const response = await fetch('/api/rooms', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name })
            });
            if (response.ok) {
                setRoomName(name); // Setting the room name if creation is successful
            } else {
                // Handle failure, maybe show error message
            }
        } catch (error) {
            console.error('Error creating room:', error);
        }
    };

    return (
        <div className="container">
            <div>
                <ul>
                    {rooms.map(room => (
                        <li key={room.roomId}>
                            <a href={`/chat/room?roomId=${room.roomId}`}>{room.name}</a>
                        </li>
                    ))}
                </ul>
            </div>
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="name" className="form-control" />
                <button type="submit" className="btn btn-secondary btn-create">개설하기</button>
            </form>
            {roomName && (
                <div className="alert alert-success">
                    {roomName} 방이 개설되었습니다.
                </div>
            )}
        </div>
    );
}

export default RoomList;
