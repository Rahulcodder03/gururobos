import React from 'react'

export default function Team() {
    return (
        <div>
            <section id="team" className="py-16">
                <div className="max-w-6xl text-blue mx-auto px-4 sm:px-6 lg:px-8">
                    <h3 className="text-2xl font-semibold">Meet the Team</h3>
                    <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="flex gap-7 justify-center bg-white rounded-2xl shadow p-6 text-center" >
                            <div>
                            <img src="csk.jpeg" alt="team" className="w-35 h-35 rounded-full mx-auto object-cover" />
                            </div>

                            <div className='flex flex-col justify-center'>
                            <h4 className="mt-4 font-semibold text-lg">Chandra shekhar kushwah</h4>
                            <p className="text-xs text-gray-500">Founder & Data Researcher</p>
                            </div>
                        </div>
                        <div className="flex gap-7 justify-center bg-white rounded-2xl shadow p-6 text-center">
                            <div>
                           <img src="rahul.jpeg" alt="team" className="w-35 h-35 rounded-full mx-auto object-cover" />
                            </div>
                            <div className='flex flex-col justify-center'>
                            <h4 className="mt-4 font-semibold text-lg">Rahul rathore</h4>
                            <p className="text-xs text-gray-500">Co-Founder & Automation</p>
                            </div>
                            
                            
                        </div>
                        <div className="flex gap-7 justify-center bg-white rounded-2xl shadow p-6 text-center">
                            <div>
                           <img src="gorav.jpg" alt="team" className="w-35 h-35 rounded-full mx-auto object-cover" />
                            </div>
                            <div className='flex flex-col justify-center'>
                           <h4 className="mt-4 font-semibold text-lg">Gourav Pandey </h4>
                            <p className="text-xs text-gray-500">Software & DevOps engineer</p>
                            </div>
                            
                            
                        </div>
                        <div className="flex gap-7 justify-center bg-white rounded-2xl shadow p-6 text-center">
                            <div>
                           <img src="alfez.jpg" alt="team" className="w-35 h-35 rounded-full mx-auto object-cover" />
                            </div>
                            <div className='flex flex-col justify-center'>
                           <h4 className="mt-4 font-semibold text-lg">Alfez Khan</h4>
                            <p className="text-xs text-gray-500">Software & Back-end Developer</p>
                            </div>
                            
                            
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
