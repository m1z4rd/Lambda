using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Amazon.Lambda.Core;

namespace AWSLambda
{
    public class Student
    {
        public Student()
        {}

        public string Name {get; set;}
        public string Email {get; set;}
    }
}