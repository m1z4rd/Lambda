using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Xunit;
using Amazon.Lambda.Core;
using Amazon.Lambda.TestUtilities;

using AWSLambda;

namespace AWSLambda.Tests
{
    public class FunctionTest
    {
        [Fact]
        public void Function()
        {

            // Invoke the lambda function and confirm the string was upper cased.
            var function = new Function();
            var context = new TestLambdaContext();
            Student student = new Student
            {
                Email = "itzel.leon@gmail.com",
                Name = "Itzel Leon"
            };

            var result = function.FunctionHandler(student, context);

            Assert.Equal($"Name {student.Name}, {student.Email}", result);
        }
    }
}
